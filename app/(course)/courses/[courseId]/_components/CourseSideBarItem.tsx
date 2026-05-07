"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, PlayCircle, Circle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const CourseSideBarItem = ({ cha, courseId, isCompleted, index }: any) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName.includes(cha.id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapter/${cha.id}`);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-all duration-200 border-l-3 border-transparent",
        "hover:bg-[#f3f3f3]",
        isActive && "bg-[#E3DFFF]/40 border-l-[3px] border-[#2F288B]",
        isCompleted && !isActive && "bg-green-50/50"
      )}
      onClick={onClick}
    >
      {/* Status Icon */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : isActive ? (
          <PlayCircle className="w-5 h-5 text-[#2F288B]" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300" />
        )}
      </div>

      {/* Chapter Info */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm truncate",
            isActive
              ? "font-semibold text-[#2F288B]"
              : isCompleted
              ? "font-medium text-emerald-700"
              : "font-medium text-gray-700"
          )}
        >
          {cha.chapterTitle}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Chapter {index + 1}
        </p>
      </div>
    </div>
  );
};

export default CourseSideBarItem;
