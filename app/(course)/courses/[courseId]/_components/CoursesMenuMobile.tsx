import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./CourseSidebar";

const CoursesMenuMobile = ({ course }: any) => {
  return (
    <Sheet>
      <SheetTrigger className=" hover:text-green-500 transition text-[18px]">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};

export default CoursesMenuMobile;
