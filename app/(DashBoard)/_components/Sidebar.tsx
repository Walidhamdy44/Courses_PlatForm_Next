import SideLinks from "./SideLinks";
import { MonitorPlay } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400">
            <MonitorPlay className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Lea<span className="text-orange-400">r</span>n
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <SideLinks />
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-[11px] text-slate-400 text-center">
          © 2026 Learn Platform
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
