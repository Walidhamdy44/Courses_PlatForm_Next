import { Progress } from "@/components/ui/progress";
import CourseSideBarItem from "./CourseSideBarItem";

const CourseSidebar = ({ course }) => {
  const totalChapters = course!.chapter.length;
  const completedChapters = course!.chapter.filter(
    (chapter) => chapter.isCompleted
  ).length;

  const chapComp = (completedChapters / totalChapters) * 100;
  return (
    <div className="flex items-start bg-white border-r flex-col shadow-md h-full overflow-y-scroll">
      <div className="mx-auto mt-3 shadow-md w-full text-center py-[20px] border-b-2 border-gray-400">
        <h2 className=" pb-[20px] font-bold w-full">{course?.title}</h2>
        <div className="px-[10px] flex items-start flex-col gap-4">
          <Progress value={chapComp} className="bg-green-200" />
          <span className="text-[16px] text-green-700 block uppercase font-semibold">
            completed : {Math.round(chapComp)}%
          </span>
        </div>
      </div>
      <div className="w-full">
        {course!.chapter.length > 0 &&
          course!.chapter.map((cha) => {
            return (
              <CourseSideBarItem key={cha.id} cha={cha} courseId={course.id} />
            );
          })}
      </div>
    </div>
  );
};

export default CourseSidebar;
