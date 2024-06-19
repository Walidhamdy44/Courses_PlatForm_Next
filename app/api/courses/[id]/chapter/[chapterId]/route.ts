import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string; chapterId: String } }
) => {
  try {
    const { userId } = auth();

    const userOwner = await db.course.findUnique({
      where: { id: params.id, userId },
    });

    if (!userOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const chapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.id,
      },
    });

    return NextResponse.json(chapter);
  } catch (err) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string; chapterId: String } }
) => {
  try {
    const { userId } = auth();
    const values = await req.json();
    const userOwner = await db.course.findUnique({
      where: { id: params.id, userId },
    });

    if (!userOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.id,
      },
      data: { ...values },
    });

    return NextResponse.json(chapter);
  } catch (err) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
