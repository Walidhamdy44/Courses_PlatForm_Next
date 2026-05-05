import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    courseId: string;
  }>;
  searchParams: Promise<{ success?: string }>;
}) => {
  const { courseId } = await params;
  const { success } = await searchParams;
  const { userId } = auth();

  // If returning from successful Stripe checkout, create the purchase record
  // This handles the case where Stripe webhook isn't configured (local dev)
  if (success === "1" && userId) {
    await db.purchase.upsert({
      where: {
        userId_courseId: { userId, courseId },
      } as any,
      create: {
        userId,
        courseId,
      },
      update: {},
    });
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }
  return redirect(`/courses/${course.id}/chapter/${course.chapter[0].id}`);
};

export default page;
