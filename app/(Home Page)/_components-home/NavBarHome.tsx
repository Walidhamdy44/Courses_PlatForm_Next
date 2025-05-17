import Logo from "./Logo";
import BtnsHome from "./BtnsHome";

const NavBarHome = () => {
  return (
    <div className=" p-[20px] flex items-center gap-4 justify-between z-20 bg-white shadow-md w-full h-[80px] fixed">
      <Logo />
      <BtnsHome />
    </div>
  );
};

export default NavBarHome;
