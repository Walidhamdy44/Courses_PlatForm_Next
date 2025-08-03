import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string; chapterId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { id, chapterId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const values = await req.json();

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: id,
      },
      data: {
        isCompleted: values.isCompleted,
      },
    });

    return NextResponse.json(chapter);
  } catch (err) {
    console.error("Complete error:", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
