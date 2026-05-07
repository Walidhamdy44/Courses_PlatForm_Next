import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import CoursesMenuMobile from "./CoursesMenuMobile";

const CourseNavBar = ({ course }: any) => {
  return (
    <div className="flex items-center justify-between h-full px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <div className="block lg:hidden">
          <CoursesMenuMobile course={course} />
        </div>

        {/* Back button */}
        <Link
          href="/explore"
          className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F288B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </Link>

        {/* Course title - visible on larger screens */}
        <div className="hidden md:block ml-4 pl-4 border-l border-gray-200">
          <p className="text-sm font-medium text-gray-900 truncate max-w-[300px]">
            {course?.title}
          </p>
        </div>
      </div>

      {/* Mobile title */}
      <div className="md:hidden flex-1 text-center">
        <p className="text-sm font-medium text-gray-900 truncate px-2">
          {course?.title}
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Link
          href={`/course-details/${course?.id}`}
          className="text-xs text-[#2F288B] font-medium hover:underline hidden sm:block"
        >
          Course Details
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default CourseNavBar;
