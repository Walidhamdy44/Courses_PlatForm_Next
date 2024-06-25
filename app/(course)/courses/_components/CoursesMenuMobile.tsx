import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./CourseSidebar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const CoursesMenuMobile = () => {
  const { userId } = auth();

  return (
    <Sheet>
      <SheetTrigger className=" hover:text-green-500 transition text-[18px]">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <CourseSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default CoursesMenuMobile;
