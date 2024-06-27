"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, FileVideo, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const CourseSideBarItem = ({ cha, courseId }: any) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName.includes(cha.id);
  const onClick = () => {
    router.push(`/courses/${courseId}/chapter/${cha.id}`);
  };
  return (
    <div
      className={cn(
        "bg-white cursor-pointer border-b-2 border-gray-200 w-full text-gray-500  pl-[20px] py-[20px] text-center flex items-center gap-6 hover:text-green-500 hover:bg-gray-200 transition",
        cha.isCompleted && "bg-gray-200 text-green-500",
        isActive && "bg-green-100"
      )}
      onClick={onClick}
    >
      {cha.isCompleted ? (
        <CheckCircle className="w-6 h-6 text-green-500" />
      ) : isActive ? (
        <PlayCircle className="w-6 h-6 text-gray-500" />
      ) : (
        <FileVideo className="w-6 h-6 text-gray-500" />
      )}

      <span className="capitalize text-[18px]">{cha.chapterTitle}</span>
    </div>
  );
};

export default CourseSideBarItem;
