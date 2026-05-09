import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// POST - Approve or reject a teacher request
export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only admin can approve/reject
    if (userId !== process.env.ADMIN_USER_ID) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { action, code } = await req.json();

    if (!action || !["approve", "reject"].includes(action)) {
      return new NextResponse("Invalid action", { status: 400 });
    }

    // Get the request
    const teacherRequest = await (db as any).teacherRequest.findUnique({
      where: { id },
    });

    if (!teacherRequest) {
      return new NextResponse("Request not found", { status: 404 });
    }

    if (teacherRequest.status !== "pending") {
      return new NextResponse("Request already processed", { status: 409 });
    }

    // For approval, verify the admin code
    if (action === "approve") {
      if (!code || code !== teacherRequest.adminCode) {
        return new NextResponse("Invalid verification code", { status: 400 });
      }
    }

    // Update the request status
    await (db as any).teacherRequest.update({
      where: { id },
      data: { status: action === "approve" ? "approved" : "rejected" },
    });

    // Update user profile
    await (db as any).userProfile.update({
      where: { clerkId: teacherRequest.userId },
      data: {
        teacherStatus: action === "approve" ? "approved" : "rejected",
      },
    });

    return NextResponse.json({
      success: true,
      action,
      userId: teacherRequest.userId,
    });
  } catch (err) {
    console.log("[TEACHER_REQUEST_ACTION]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
