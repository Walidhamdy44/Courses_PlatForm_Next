import { MonitorPlay } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <p className="text-[25px] font-extrabold text-green-500 cursor-pointer italic">
        Lea<span className=" text-orange-400">r</span>n
      </p>
      <MonitorPlay className="text-green-500" />
    </Link>
  );
};

export default Logo;
