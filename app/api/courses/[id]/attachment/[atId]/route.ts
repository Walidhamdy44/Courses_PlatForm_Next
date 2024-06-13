import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string; atId: String } }
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

    const attachment = await db.attachment.delete({
      where: {
        id: params.atId,
        courseId: params.id,
      },
    });

    return NextResponse.json(attachment);
  } catch (err) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
