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
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { rating, comment } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return new NextResponse("Rating must be between 1 and 5", {
        status: 400,
      });
    }

    // Verify user has purchased the course
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: { userId, courseId: id },
      },
    });

    if (!purchase) {
      return new NextResponse("You must purchase this course to leave a review", {
        status: 403,
      });
    }

    // Create or update review
    const review = await (db as any).review.upsert({
      where: {
        userId_courseId: { userId, courseId: id },
      },
      create: {
        userId,
        courseId: id,
        rating: Math.round(rating),
        comment: comment || null,
      },
      update: {
        rating: Math.round(rating),
        comment: comment || null,
      },
    });

    return NextResponse.json(review);
  } catch (err) {
    console.log("[REVIEW_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const reviews = await (db as any).review.findMany({
      where: { courseId: id },
      orderBy: { createdAt: "desc" },
    });

    // Calculate average
    const avg =
      reviews.length > 0
        ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          reviews.length
        : 0;

    return NextResponse.json({
      reviews,
      averageRating: Math.round(avg * 10) / 10,
      totalReviews: reviews.length,
    });
  } catch (err) {
    console.log("[REVIEW_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await (db as any).review.delete({
      where: {
        userId_courseId: { userId, courseId: id },
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.log("[REVIEW_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
