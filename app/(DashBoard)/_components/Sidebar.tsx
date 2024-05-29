import Image from "next/image";

import SideLinks from "./SideLinks";

const Sidebar = () => {
  return (
    <div className="flex items-start gap-4 bg-white border-r flex-col shadow-md h-full">
      <div className="cursor-pointer text-center rounded-2xl overflow-hidden flex items-center gap-3 p-[10px]">
        <Image src="/imgs/logo.jpg" alt="Company Logo" width={50} height={50} />
        <span className=" font-extrabold">Courses Platform</span>
      </div>
      <SideLinks />
    </div>
  );
};

export default Sidebar;
