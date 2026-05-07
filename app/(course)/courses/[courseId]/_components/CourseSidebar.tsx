"use client";

import { Progress } from "@/components/ui/progress";
import CourseSideBarItem from "./CourseSideBarItem";
import { BookOpen, Trophy } from "lucide-react";

const CourseSidebar = ({ course }: any) => {
  const totalChapters = course!.chapter.length;
  const completedChapters = course!.chapter.filter(
    (chapter: any) => chapter.userProgress?.[0]?.isCompleted
  ).length;

  const chapComp = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E3DFFF] flex items-center justify-center">
                <Trophy className="w-4 h-4 text-[#2F288B]" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Progress
              </span>
            </div>
            <span className="text-sm font-bold text-[#2F288B]">
              {Math.round(chapComp)}%
            </span>
          </div>
          <Progress value={chapComp} className="h-2 bg-[#E3DFFF]" indicatorClassName="bg-[#2F288B]" />
          <p className="text-xs text-gray-500">
            {completedChapters} of {totalChapters} chapters completed
          </p>
        </div>
      </div>

      {/* Chapter List Header */}
      <div className="px-5 py-3 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Chapters
          </span>
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto">
        {course!.chapter.length > 0 &&
          course!.chapter.map((cha: any, index: number) => {
            const isCompleted = cha.userProgress?.[0]?.isCompleted ?? false;
            return (
              <CourseSideBarItem
                key={cha.id}
                cha={cha}
                courseId={course.id}
                isCompleted={isCompleted}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CourseSidebar;
