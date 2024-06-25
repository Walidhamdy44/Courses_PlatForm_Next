import { Progress } from "@/components/ui/progress";
import { Chapter, Course } from "@prisma/client";
import CourseSideBarItem from "./CourseSideBarItem";

interface course {
  title: string;
  category: string;
  course: Course;
  chapters?: Chapter[]; // Make chapters optional
}

const CourseSidebar = ({ title, category, chapters = [], course }: course) => {
  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(
    (chapter) => chapter.isCompleted
  ).length;

  const chapComp = (completedChapters / totalChapters) * 100;
  return (
    <div className="flex items-start bg-white border-r flex-col shadow-md h-full">
      <div className="mx-auto mt-3 shadow-md w-full text-center py-[20px] border-b-2 border-gray-400">
        <h2 className=" pb-[20px] font-bold w-full">{title}</h2>
        <div className="p-[10px]">
          <Progress value={chapComp} />
          <span className="text-[16px] text-gray-700 pt-[10px] block">
            completed : {chapComp}%
          </span>
        </div>
      </div>
      <div className="w-full">
        {chapters.length > 0 &&
          chapters.map((cha) => {
            return (
              <CourseSideBarItem key={cha.id} cha={cha} courseId={course.id} />
            );
          })}
      </div>
    </div>
  );
};

export default CourseSidebar;
