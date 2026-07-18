import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import BusinessServiceRequest from "@/models/BusinessServiceRequest";
import BusinessService from "@/models/BusinessService";
import { requireAdmin } from "@/lib/auth";

const createSchema = z.object({
  businessServiceId: z.string().min(1, "Please select a business service."),
  name: z.string().trim().min(1, "Please enter your name."),
  city: z.string().trim().min(1, "Please select your city."),
  address: z.string().trim().optional().default(""),
  mobile: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number."),
  message: z.string().trim().min(5, "Please tell us about your requirements."),
});

/** POST /api/business-service-requests — public: anyone can submit an enquiry from a business service page. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    const { businessServiceId, name, city, address, mobile, message } = parsed.data;

    await connectDB();

    const service = await BusinessService.findById(businessServiceId);
    if (!service) {
      return NextResponse.json(
        { error: "Selected business service was not found." },
        { status: 404 }
      );
    }

    const request = await BusinessServiceRequest.create({
      businessService: service._id,
      businessServiceName: service.name,
      name,
      city,
      address,
      mobile,
      message,
      status: "new",
    });

    return NextResponse.json({ success: true, request }, { status: 201 });
  } catch (err) {
    console.error("[business-service-requests] create error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/** GET /api/business-service-requests — admin lists all business service enquiries, newest first. */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const requests = await BusinessServiceRequest.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(requests);
  } catch (err) {
    console.error("[business-service-requests] list error:", err);
    return NextResponse.json(
      { error: "Failed to load business service requests." },
      { status: 500 }
    );
  }
}
