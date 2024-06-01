import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
        <div className="w-[70%]">
          <Progress value={progressText} />
        </div>
      </div>
    </div>
  );
};

export default CoursePageDetails;
