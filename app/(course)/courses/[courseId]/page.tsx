import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{
    courseId: string;
  }>;
}) => {
  const { courseId } = await params;
  
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
