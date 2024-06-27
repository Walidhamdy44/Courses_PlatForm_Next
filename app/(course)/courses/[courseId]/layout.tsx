import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import CourseSidebar from "./_components/CourseSidebar";
import CourseNavBar from "./_components/CourseNavBar";
import CoursesMenuMobile from "./_components/CoursesMenuMobile";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        orderBy: {
          created_at: "asc",
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return (
    <div>
      <div className=" md:pl-80 h-[80px] w-full flex fixed inset-y-0 z-40 bg-white">
        <CourseNavBar course={course} />
      </div>
      <div className="hidden md:flex w-80 h-full flex-col fixed inset-y-0 z-40">
        <CourseSidebar course={course} />
      </div>
      <main className="md:pl-80 w-full pt-[80px]">{children}</main>
    </div>
  );
};

export default layout;
