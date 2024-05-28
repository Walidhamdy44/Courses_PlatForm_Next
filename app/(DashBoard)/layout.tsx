import Sidebar from "./_components/Sidebar";

const layoutDashbord = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden md:flex w-56 h-full flex-col fixed inset-y-0 z-40">
        <Sidebar />
      </div>
      <div className="flex w-full h-[100px] fixed">hi</div>
      {children}
    </div>
  );
};

export default layoutDashbord;
