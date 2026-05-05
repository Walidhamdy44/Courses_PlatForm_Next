import { UserButton } from "@clerk/nextjs";
import MenuMobile from "./MenuMobile";
import NavMood from "./Nav-Mood";
import SearchNavBar from "./SearchNavBar";
import { Bell } from "lucide-react";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-6 w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm z-20">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-4">
        <div className="block lg:hidden">
          <MenuMobile />
        </div>
        <div className="hidden md:block w-[320px] lg:w-[400px]">
          <SearchNavBar />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <NavMood />
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>
        <div className="w-px h-8 bg-gray-200 mx-1" />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-9 h-9",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
