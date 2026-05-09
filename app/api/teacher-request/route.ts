import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { expertise, experience, motivation } = await req.json();

    if (!expertise || !experience || !motivation) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    // Check if user already has a pending request
    const existing = await (db as any).teacherRequest.findFirst({
      where: { userId, status: "pending" },
    });

    if (existing) {
      // Delete the old pending request so user can resubmit
      await (db as any).teacherRequest.delete({
        where: { id: existing.id },
      });
    }

    // Check if already approved
    const profile = await (db as any).userProfile.findUnique({
      where: { clerkId: userId },
    });

    if (profile?.teacherStatus === "approved") {
      return new NextResponse("You are already a teacher", { status: 409 });
    }

    // Generate 6-digit code
    const adminCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create the request
    const teacherRequest = await (db as any).teacherRequest.create({
      data: {
        userId,
        expertise,
        experience,
        motivation,
        adminCode,
        status: "pending",
      },
    });

    // Update user profile status to pending
    await (db as any).userProfile.update({
      where: { clerkId: userId },
      data: { teacherStatus: "pending" },
    });

    // Get user info for the email
    const displayName =
      profile?.displayName ||
      `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
      "User";

    // Send email to admin
    const emailResult = await resend.emails.send({
      from: "EduStride <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `New Teacher Request from ${displayName}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #170777, #5652b3); padding: 30px; border-radius: 16px 16px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Teacher Request</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">A user wants to become an instructor</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
            <div style="margin-bottom: 24px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 4px;">Applicant</p>
              <p style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0;">${displayName}</p>
              <p style="color: #6b7280; font-size: 14px; margin: 4px 0 0;">${profile?.email || ""}</p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 4px;">Subject Expertise</p>
              <p style="color: #1f2937; font-size: 14px; margin: 0;">${expertise}</p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 4px;">Experience</p>
              <p style="color: #1f2937; font-size: 14px; margin: 0;">${experience}</p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 4px;">Motivation</p>
              <p style="color: #1f2937; font-size: 14px; margin: 0;">${motivation}</p>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Admin Verification Code</p>
              <p style="color: #170777; font-size: 32px; font-weight: 700; letter-spacing: 0.1em; margin: 0;">${adminCode}</p>
            </div>

            <p style="color: #6b7280; font-size: 13px; text-align: center; margin-top: 20px;">
              Use this code in the admin dashboard to approve this request.<br/>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/teacher-requests" style="color: #170777; font-weight: 600;">Go to Admin Dashboard →</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("[TEACHER_REQUEST] Email result:", JSON.stringify(emailResult));

    return NextResponse.json(teacherRequest);
  } catch (err) {
    console.log("[TEACHER_REQUEST_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// GET - check current user's teacher request status
export const GET = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const request = await (db as any).teacherRequest.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const profile = await (db as any).userProfile.findUnique({
      where: { clerkId: userId },
      select: { teacherStatus: true },
    });

    return NextResponse.json({
      request,
      teacherStatus: profile?.teacherStatus || "none",
    });
  } catch (err) {
    console.log("[TEACHER_REQUEST_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
