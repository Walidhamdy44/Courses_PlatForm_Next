import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// POST - Follow a user
export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { followingId } = await req.json();

    if (!followingId) {
      return new NextResponse("Missing followingId", { status: 400 });
    }

    if (userId === followingId) {
      return new NextResponse("Cannot follow yourself", { status: 400 });
    }

    const follow = await (db as any).follow.create({
      data: {
        followerId: userId,
        followingId,
      },
    });

    return NextResponse.json(follow);
  } catch (err: any) {
    // Handle duplicate follow (already following)
    if (err?.code === "P2002") {
      return new NextResponse("Already following", { status: 409 });
    }
    console.error("[FOLLOW_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// DELETE - Unfollow a user
export const DELETE = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { followingId } = await req.json();

    if (!followingId) {
      return new NextResponse("Missing followingId", { status: 400 });
    }

    await (db as any).follow.deleteMany({
      where: {
        followerId: userId,
        followingId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[FOLLOW_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
