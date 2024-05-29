"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SideLinks = () => {
  const pathname = usePathname();
  const isDash = pathname.includes("/dashboard");
  const isExplore = pathname.includes("/explore");
  const isTeacher = pathname.includes("/teacher");
  const isAnaltics = pathname.includes("/teacher/analtics");
  const isCourses = pathname.includes("/teacher/courses");

  return (
    <>
      {isTeacher ? (
        <ul className="flex flex-col  w-full px-3 gap-[15px] text-center">
          <li
            className={cn(
              "relative w-full py-[10px] px-[10px] text-[20px] rounded-md cursor-pointer hover:bg-[rgba(46,229,110,0.256)] transition-all",
              isCourses ? "active" : ""
            )}
          >
            <Link href="/teacher/courses" className="flex items-center gap-4">
              <Image
                src="/imgs/dashboard-1-svgrepo-com.svg"
                width={30}
                height={30}
                alt="dashboard"
              />
              <span>Corses</span>
            </Link>
          </li>
          <li
            className={cn(
              "relative w-full py-[10px]  px-[10px] text-[20px] rounded-md cursor-pointer hover:bg-[rgba(46,229,110,0.256)] transition-all",
              isAnaltics ? "active" : ""
            )}
          >
            <Link href="/teacher/analtics" className="flex items-center gap-4">
              <Image
                src="/imgs/browser-search-svgrepo-com.svg"
                width={30}
                height={30}
                alt="dashboard"
              />
              <span>Analtics</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col  w-full px-3 gap-[15px] text-center">
          <li
            className={cn(
              "relative w-full py-[10px] px-[10px] text-[20px] rounded-md cursor-pointer hover:bg-[rgba(46,229,110,0.256)] transition-all",
              isDash ? "active" : ""
            )}
          >
            <Link href="/dashboard" className="flex items-center gap-4">
              <Image
                src="/imgs/dashboard-1-svgrepo-com.svg"
                width={30}
                height={30}
                alt="dashboard"
              />
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={cn(
              "relative w-full py-[10px]  px-[10px] text-[20px] rounded-md cursor-pointer hover:bg-[rgba(46,229,110,0.256)] transition-all",
              isExplore ? "active" : ""
            )}
          >
            <Link href="/explore" className="flex items-center gap-4">
              <Image
                src="/imgs/browser-search-svgrepo-com.svg"
                width={30}
                height={30}
                alt="dashboard"
              />
              <span>Explore</span>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default SideLinks;
