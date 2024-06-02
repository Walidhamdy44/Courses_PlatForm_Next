import NavBar from "./_components/NavBar";
import Sidebar from "./_components/Sidebar";

const layoutDashbord = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className=" md:pl-56 h-[80px] w-full flex fixed inset-y-0 z-40 bg-white">
        <NavBar />
      </div>
      <div className="hidden md:flex w-56 h-full flex-col fixed inset-y-0 z-40">
        <Sidebar />
      </div>
      <main className="md:pl-56 w-full pt-[80px]">{children}</main>
    </div>
  );
};

export default layoutDashbord;
