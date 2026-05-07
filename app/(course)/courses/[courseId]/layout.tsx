import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import CourseSidebar from "./_components/CourseSidebar";
import CourseNavBar from "./_components/CourseNavBar";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

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
        orderBy: {
          position: "asc",
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
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

  if (!course) {
    return redirect("/");
  }
  return (
    <div className="h-screen flex flex-col bg-[#f9f9f9]">
      {/* Top Navbar */}
      <div className="h-16 border-b border-gray-100 bg-white flex-shrink-0 z-40">
        <CourseNavBar course={course} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:flex w-80 flex-shrink-0 border-r border-gray-100 overflow-y-auto bg-white">
          <CourseSidebar course={course} />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default layout;
