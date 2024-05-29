import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import MenuMobile from "./MenuMobile";
import NavMood from "./Nav-Mood";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between py-[10px] px-[30px] w-full shadow-lg ">
      <div className="block lg:hidden">
        <MenuMobile />
      </div>
      <div className="w-[400px] max-sm:w-auto">
        <Input placeholder="🔍   Search For Course" />
      </div>
      <div className="flex gap-3 items-center">
        <NavMood />
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
