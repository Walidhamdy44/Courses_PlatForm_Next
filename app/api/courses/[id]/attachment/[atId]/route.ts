import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string; atId: string }> }
) => {
  try {
    const { userId } = auth();
    const { id, atId } = await params;

    const userOwner = await db.course.findUnique({
      where: { id: id, userId: userId as string },
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

    const attachment = await db.attachment.delete({
      where: {
        id: atId,
        courseId: id,
      },
    });

    return NextResponse.json(attachment);
  } catch (err) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
