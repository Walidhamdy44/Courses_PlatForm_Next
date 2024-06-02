import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Patch For Title Data ..>
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const { userId } = auth();

    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const course = await db.course.update({
      where: { id, userId },
      data: { ...values },
    });
    return NextResponse.json(course);
  } catch (err) {
    console.log("course" + err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
