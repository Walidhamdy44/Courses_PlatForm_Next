import { MonitorPlay } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-[25px] font-extrabold text-green-500 cursor-pointer italic">
        Lea<span className=" text-orange-400">r</span>n
      </p>
      <MonitorPlay className="text-green-500" />
    </div>
  );
};

export default Logo;
