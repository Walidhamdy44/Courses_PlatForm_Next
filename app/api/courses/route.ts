import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const courese = await db.course.create({
      data: {
        title,
        userId,
      },
    });
    return NextResponse.json(courese);
  } catch (err) {
    console.log("courese" + err);
    return new NextResponse("Enternal Error", {
      status: 500,
    });
  }
};
