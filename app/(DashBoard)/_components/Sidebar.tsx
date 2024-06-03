import SideLinks from "./SideLinks";
import Logo from "@/app/_components-home/Logo";

const Sidebar = () => {
  return (
    <div className="flex items-start gap-4 bg-white border-r flex-col shadow-md h-full">
      <div className="mx-auto mt-[20px] mb-0">
        <Logo />
      </div>
      <SideLinks />
    </div>
  );
};

export default Sidebar;
