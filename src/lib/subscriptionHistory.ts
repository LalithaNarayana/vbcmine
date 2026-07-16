import { Types } from "mongoose";
import SubscriptionHistory, { SubscriptionChangeReason } from "@/models/SubscriptionHistory";

/** Records a plan-change entry. Never throws — a logging failure shouldn't break the calling flow. */
export async function logSubscriptionChange(params: {
  userId: string | Types.ObjectId;
  oldPlanId: string | Types.ObjectId | null;
  newPlanId: string | Types.ObjectId;
  reason: SubscriptionChangeReason;
  note?: string;
}): Promise<void> {
  try {
    await SubscriptionHistory.create({
      user: params.userId,
      oldPlan: params.oldPlanId,
      newPlan: params.newPlanId,
      reason: params.reason,
      note: params.note || "",
    });
  } catch (err) {
    console.error("[subscriptionHistory] log error:", err);
  }
}

/** Compares two plan prices to label a change as an upgrade or downgrade. */
export function classifyPlanChange(oldPrice: number, newPrice: number): "upgrade" | "downgrade" {
  return newPrice >= oldPrice ? "upgrade" : "downgrade";
}
