import MenuMobile from "@/app/(DashBoard)/_components/MenuMobile";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { FcLeft } from "react-icons/fc";
import CoursesMenuMobile from "./CoursesMenuMobile";

const CourseNavBar = ({ course }: any) => {
  return (
    <div className="flex items-center justify-between py-[10px] px-[30px] w-full shadow-lg z-20 ">
      <div className="block lg:hidden">
        <CoursesMenuMobile course={course} />
      </div>
      <div className="flex gap-3 w-full items-center justify-end">
        <Button variant="ghost">
          <Link href="/explore" className="flex items-center gap-3">
            <FcLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </Link>
        </Button>
        <UserButton />
      </div>
    </div>
  );
};

export default CourseNavBar;
