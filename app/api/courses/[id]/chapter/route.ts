import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { userId } = auth();
    const { id } = await params;
    const { chapterTitle } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const userOwner = await db.course.findUnique({
      where: { id: id, userId },
    });

    if (!userOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const lastChapter = await db.chapter.findFirst({
      where: { courseId: id },
      orderBy: { position: "desc" },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        chapterTitle,
        position: newPosition,
        courseId: id,
      },
    });

    return NextResponse.json(chapter);
  } catch (err) {
    console.log("chapters" + err);
    return new NextResponse("Enternal Error", {
      status: 500,
    });
  }
};
