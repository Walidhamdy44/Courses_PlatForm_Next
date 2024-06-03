import { Button } from "@/components/ui/button";
import { MonitorPlay } from "lucide-react";
import Logo from "./Logo";

const NavBarHome = () => {
  return (
    <div className="flex items-center gap-4 justify-between p-4 bg-white shadow-md w-full h-[80px] fixed">
      <Logo />
      <div className="flex items-center gap-4 ">
        <Button variant="outline" className="rounded-2xl border-green-700">
          Sign Up
        </Button>
        <Button className="rounded-2xl border-green-700">Sign In</Button>
      </div>
    </div>
  );
};

export default NavBarHome;
