import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import Payment from "@/models/Payment";
import { requireAdmin } from "@/lib/auth";

const BILLING_CYCLE_DAYS = 30;
const DEFAULT_RANGE_DAYS = 30;

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function parseRange(searchParams: URLSearchParams): { from: Date; to: Date } {
  const now = new Date();
  const toParam = searchParams.get("to");
  const fromParam = searchParams.get("from");

  const to = toParam ? new Date(toParam) : now;
  to.setHours(23, 59, 59, 999);

  const from = fromParam
    ? new Date(fromParam)
    : new Date(to.getTime() - DEFAULT_RANGE_DAYS * 24 * 60 * 60 * 1000);
  from.setHours(0, 0, 0, 0);

  return { from, to };
}

/** Builds a zero-filled array of every day between from/to inclusive. */
function buildDayBuckets(from: Date, to: Date): string[] {
  const days: string[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(to);
  end.setHours(0, 0, 0, 0);
  while (cursor <= end) {
    days.push(dayKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

async function usersReport(from: Date, to: Date) {
  const users = await User.find({ createdAt: { $gte: from, $lte: to } })
    .select("createdAt")
    .lean();

  const buckets = new Map<string, number>();
  for (const day of buildDayBuckets(from, to)) buckets.set(day, 0);
  for (const u of users) {
    const key = dayKey(new Date(u.createdAt));
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }

  const series = Array.from(buckets.entries()).map(([date, count]) => ({ date, value: count }));

  return {
    summary: [{ label: "New Users", value: users.length }],
    series,
    seriesLabel: "New Users",
  };
}

async function subscriptionsReport(from: Date, to: Date) {
  const assignedRequests = await ConnectionRequest.find({
    status: "assigned",
    createdAt: { $gte: from, $lte: to },
  })
    .populate({ path: "plan", select: "name" })
    .sort({ updatedAt: -1 })
    .lean();

  // Latest assigned plan per user within the range.
  const planByUser = new Map<string, string>();
  for (const req of assignedRequests) {
    const userId = req.user?.toString();
    if (!userId || planByUser.has(userId)) continue;
    const plan = req.plan as unknown as { name: string } | null;
    if (plan) planByUser.set(userId, plan.name);
  }

  const counts = new Map<string, number>();
  for (const planName of planByUser.values()) {
    counts.set(planName, (counts.get(planName) || 0) + 1);
  }

  const series = Array.from(counts.entries())
    .map(([planName, count]) => ({ date: planName, value: count }))
    .sort((a, b) => b.value - a.value);

  return {
    summary: [{ label: "Subscribers (in range)", value: planByUser.size }],
    series,
    seriesLabel: "Subscribers",
  };
}

async function revenueReport(from: Date, to: Date) {
  const payments = await Payment.find({
    status: "success",
    createdAt: { $gte: from, $lte: to },
  })
    .select("totalAmount createdAt")
    .lean();

  const buckets = new Map<string, number>();
  for (const day of buildDayBuckets(from, to)) buckets.set(day, 0);
  let total = 0;
  for (const p of payments) {
    const key = dayKey(new Date(p.createdAt));
    buckets.set(key, (buckets.get(key) || 0) + p.totalAmount);
    total += p.totalAmount;
  }

  const series = Array.from(buckets.entries()).map(([date, amount]) => ({ date, value: amount }));

  return {
    summary: [
      { label: "Total Revenue", value: `₹${total.toLocaleString("en-IN")}` },
      { label: "Transactions", value: payments.length },
    ],
    series,
    seriesLabel: "Revenue (₹)",
  };
}

async function renewalsReport(from: Date, to: Date) {
  const renewalPayments = await Payment.find({
    purpose: "renewal",
    status: "success",
    createdAt: { $gte: from, $lte: to },
  })
    .select("createdAt")
    .lean();

  const renewedBuckets = new Map<string, number>();
  for (const day of buildDayBuckets(from, to)) renewedBuckets.set(day, 0);
  for (const p of renewalPayments) {
    const key = dayKey(new Date(p.createdAt));
    renewedBuckets.set(key, (renewedBuckets.get(key) || 0) + 1);
  }

  // Expired: active users whose current billing cycle has already lapsed
  // (i.e. they haven't renewed) and whose expiry date falls in range.
  const activeUsers = await User.find({ connectionStatus: { $in: ["active", "inactive"] }, accountId: { $ne: null } })
    .select("_id")
    .lean();

  let expiredCount = 0;
  const expiredBuckets = new Map<string, number>();
  for (const day of buildDayBuckets(from, to)) expiredBuckets.set(day, 0);

  for (const user of activeUsers) {
    const assignedRequest = await ConnectionRequest.findOne({ user: user._id, status: "assigned" })
      .sort({ updatedAt: -1 })
      .lean();
    if (!assignedRequest) continue;

    const lastSuccessfulPayment = await Payment.findOne({ user: user._id, status: "success" })
      .sort({ createdAt: -1 })
      .lean();

    const cycleStart = lastSuccessfulPayment
      ? new Date(lastSuccessfulPayment.createdAt)
      : new Date(assignedRequest.updatedAt);

    const expiresAt = new Date(cycleStart);
    expiresAt.setDate(expiresAt.getDate() + BILLING_CYCLE_DAYS);

    const isOverdue = expiresAt.getTime() < Date.now();
    if (isOverdue && expiresAt >= from && expiresAt <= to) {
      expiredCount += 1;
      const key = dayKey(expiresAt);
      expiredBuckets.set(key, (expiredBuckets.get(key) || 0) + 1);
    }
  }

  const days = buildDayBuckets(from, to);
  const series = days.map((date) => ({
    date,
    value: renewedBuckets.get(date) || 0,
    secondaryValue: expiredBuckets.get(date) || 0,
  }));

  return {
    summary: [
      { label: "Renewed", value: renewalPayments.length },
      { label: "Expired (not yet renewed)", value: expiredCount },
    ],
    series,
    seriesLabel: "Renewed",
    secondaryLabel: "Expired",
  };
}

/**
 * GET /api/admin/reports?type=users|subscriptions|revenue|renewals&from=&to=
 * Returns a summary + a day-bucketed (or plan-bucketed for subscriptions)
 * series for the requested report type over the given date range.
 */
export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "users";
  const { from, to } = parseRange(searchParams);

  try {
    await connectDB();

    let data;
    if (type === "subscriptions") {
      data = await subscriptionsReport(from, to);
    } else if (type === "revenue") {
      data = await revenueReport(from, to);
    } else if (type === "renewals") {
      data = await renewalsReport(from, to);
    } else {
      data = await usersReport(from, to);
    }

    return NextResponse.json({
      type,
      from: from.toISOString(),
      to: to.toISOString(),
      ...data,
    });
  } catch (err) {
    console.error("[admin/reports] error:", err);
    return NextResponse.json({ error: "Failed to load report." }, { status: 500 });
  }
}
