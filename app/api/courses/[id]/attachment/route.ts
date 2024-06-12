import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Patch For Title Data ..>
export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    const { url } = await req.json();

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
    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.id,
      },
    });
    return NextResponse.json(attachment);
  } catch (err) {
    console.log("course Attachmnt error" + err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};

export const DELETE = async (id: String) => {
  try {
    const attachment = await db.attachment;
  } catch (err) {
    console.log("course Attachmnt error" + err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
