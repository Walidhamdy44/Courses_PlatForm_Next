"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  BarChart3,
  GraduationCap,
  ChevronRight,
  UserCircle,
} from "lucide-react";

const SideLinks = () => {
  const pathname = usePathname();
  const isTeacher = pathname.includes("/teacher");

  const studentLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/explore",
      label: "Explore Courses",
      icon: Compass,
      active: pathname.includes("/explore"),
    },
    {
      href: "/profile",
      label: "My Profile",
      icon: UserCircle,
      active: pathname.includes("/profile"),
    },
  ];

  const teacherLinks = [
    {
      href: "/teacher/courses",
      label: "My Courses",
      icon: BookOpen,
      active: pathname.includes("/teacher/courses"),
    },
    {
      href: "/teacher/analtics",
      label: "Analytics",
      icon: BarChart3,
      active: pathname.includes("/teacher/analtics"),
    },
  ];

  const links = isTeacher ? teacherLinks : studentLinks;

  return (
    <div className="space-y-1.5">
      {/* Section Label */}
      <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {isTeacher ? "Teacher Mode" : "Menu"}
      </p>

      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            link.active
              ? "bg-white/10 text-white shadow-sm"
              : "text-slate-300 hover:bg-white/5 hover:text-white",
          )}
        >
          <link.icon
            className={cn(
              "w-5 h-5 flex-shrink-0 transition-colors",
              link.active
                ? "text-emerald-400"
                : "text-slate-400 group-hover:text-slate-200",
            )}
          />
          <span className="flex-1">{link.label}</span>
          {link.active && <ChevronRight className="w-4 h-4 text-emerald-400" />}
        </Link>
      ))}

      {/* Divider */}
      <div className="my-4 border-t border-white/10" />

      {/* Mode Switch */}
      <Link
        href={isTeacher ? "/dashboard" : "/teacher/courses"}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-200"
      >
        <GraduationCap className="w-5 h-5 text-slate-400" />
        <span>{isTeacher ? "Student Mode" : "Teacher Mode"}</span>
      </Link>
    </div>
  );
};

export default SideLinks;
