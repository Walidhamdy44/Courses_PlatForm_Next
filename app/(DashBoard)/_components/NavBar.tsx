import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import MenuMobile from "./MenuMobile";
import NavMood from "./Nav-Mood";
import SearchNavBar from "./SearchNavBar";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between py-[10px] px-[30px] w-full shadow-lg z-20 ">
      <div className="block lg:hidden">
        <MenuMobile />
      </div>
      <div className="hidden md:block w-[400px]">
        <SearchNavBar />
      </div>
      <div className="flex gap-3 items-center">
        <NavMood />
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
