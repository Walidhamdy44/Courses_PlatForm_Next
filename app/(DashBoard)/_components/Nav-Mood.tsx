"use client";

import { GraduationCap, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMood = () => {
  const pathName = usePathname();
  const isTeacher = pathName.includes("/teacher");

  return (
    <div>
      {isTeacher ? (
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Exit Teacher</span>
        </Link>
      ) : (
        <Link
          href="/teacher/courses"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="hidden sm:inline">Teacher Mode</span>
        </Link>
      )}
    </div>
  );
};

export default NavMood;
