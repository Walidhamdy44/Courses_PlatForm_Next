import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "../_components/TitleForm";
import DescForm from "../_components/DescForm";
import ImageForm from "../_components/ImageFileUpload";

const CoursePageDetails = async ({ params }: { params: { id: string } }) => {
  const CourseId = params.id;
  const Course = await db.course.findUnique({
    where: {
      id: CourseId,
    },
  });
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  if (!Course) {
    return redirect("/dashboard");
  }

  const requiredFields = [
    Course.title,
    Course.imgUrl,
    Course.price,
    Course.description,
    Course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const missingFields = requiredFields.filter(Boolean).length;
  const progressText = (missingFields / totalFields) * 100;
  return (
    <div className="p-6">
      <div>
        <h2 className="text-[23px] font-extrabold">Course Setup </h2>
        <p className="text-[16px] text-gray-700 py-[20px]">
          Complate All Fields :{" "}
          <span className="font-extrabold text-green-600">{progressText}%</span>
        </p>
        <div className="lg:w-[70%] md:w-full sm:w-full pb-[20px]">
          <Progress value={progressText} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[60px]">
        <div>
          <div>
            <h2 className="flex items-center gap-4 text-[20px] font-bold">
              <Badge>
                <LayoutDashboard />
              </Badge>
              Custmize Your Course
            </h2>
          </div>
          <div>
            <TitleForm initialData={Course} courseId={CourseId} />
          </div>
          <div>
            <DescForm initialData={Course} courseId={CourseId} />
          </div>
          <div>
            <ImageForm initialData={Course} courseId={CourseId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePageDetails;
