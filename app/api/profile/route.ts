import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET - Fetch user profile (create if doesn't exist)
export const GET = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let profile = await (db as any).userProfile.findUnique({
      where: { clerkId: userId },
    });

    // If no profile exists, create one from Clerk data
    if (!profile) {
      const user = await currentUser();
      profile = await (db as any).userProfile.create({
        data: {
          clerkId: userId,
          email: user?.emailAddresses[0]?.emailAddress || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          profileImage: user?.imageUrl || "",
          displayName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        },
      });
    }

    return NextResponse.json(profile);
  } catch (err) {
    console.error("[PROFILE_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// PATCH - Update user profile
export const PATCH = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    // Remove fields that shouldn't be updated directly
    delete values.id;
    delete values.clerkId;
    delete values.createdAt;
    delete values.updatedAt;

    const profile = await (db as any).userProfile.upsert({
      where: { clerkId: userId },
      update: values,
      create: {
        clerkId: userId,
        email: values.email || "",
        ...values,
      },
    });

    return NextResponse.json(profile);
  } catch (err) {
    console.error("[PROFILE_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
