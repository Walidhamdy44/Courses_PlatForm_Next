import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const purchase = await db.purchase.create({
      data: {
        courseId: id,
        userId,
      },
    });
    return NextResponse.json(purchase);
  } catch (err) {
    console.error("Purchase error:", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
