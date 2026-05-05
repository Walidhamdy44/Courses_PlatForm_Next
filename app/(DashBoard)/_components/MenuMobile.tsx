import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const MenuMobile = () => {
  return (
    <Sheet>
      <SheetTrigger className=" hover:text-green-500 transition text-[18px]">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MenuMobile;
