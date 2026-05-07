"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./CourseSidebar";

const CoursesMenuMobile = ({ course }: any) => {
  return (
    <Sheet>
      <SheetTrigger className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Menu className="w-5 h-5 text-gray-700" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};

export default CoursesMenuMobile;
