import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  BadgeDollarSign,
  LayoutDashboard,
  ListTodo,
  Sliders,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "../_components/TitleForm";
import DescForm from "../_components/DescForm";
import ImageForm from "../_components/ImageFileUpload";
import CategoryForm from "../_components/CategoryForm";
import PriceForm from "../_components/PriceForm";
import AttachmentForm from "../_components/AttachmentForm";
import ChapterForm from "../_components/ChapterForm";
import Banner from "@/components/Banner";
import PublishCourse from "../_components/PubishCourse";

const CoursePageDetails = async ({ params }: { params: { id: string } }) => {
  const CourseId = params.id;
  const { userId } = auth();

  // fitch  course from db
  const Course = await db.course.findUnique({
    where: {
      id: CourseId,
      userId,
    },
    include: {
      chapter: {
        orderBy: {
          position: "asc",
        },
      },
      attachment: {
        orderBy: {
          created_at: "desc",
        },
      },
    },
  });
  // fitch all Categorys from db
  const Categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
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
    Course.chapter.length > 1,
    Course.attachment.length >= 1,
  ];
  const totalFields = requiredFields.length;
  const missingFields = requiredFields.filter(Boolean).length;
  const progressText = (missingFields / totalFields) * 100;

  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!Course.isPublished ? (
        <Banner
          message="⚠️    This Course is Not Published Your Studints Cant Visit it !"
          color="bg-[#fcf128]"
        />
      ) : (
        <Banner
          message=" ✔️     Now This Course Is Published 🤍"
          color="bg-green-400"
        />
      )}
      <div className="p-6">
        <div>
          <div className="flex items-center gap-x-4 justify-between mt-[40px]">
            <h2 className="text-[23px] font-extrabold">Chapter Setup </h2>
            <PublishCourse
              isPublished={Course.isPublished}
              courseId={Course.id}
              canPublished={isComplete}
            />
          </div>
          <p className="text-[16px] text-gray-700 py-[20px]">
            Complate All Fields :{" "}
            <span className="font-extrabold text-green-600">
              {Math.round(progressText)}%
            </span>
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
            <div>
              <CategoryForm
                initialData={Course}
                courseId={CourseId}
                options={Categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            </div>
          </div>
          <div>
            <div>
              <h2 className="flex items-center gap-4 text-[20px] font-bold">
                <Badge>
                  <ListTodo />
                </Badge>
                Courses Chapter
              </h2>
            </div>
            <div>
              <ChapterForm initialData={Course} courseId={CourseId} />
            </div>
            <div>
              <h2 className="flex items-center gap-4 text-[20px] font-bold mt-7">
                <Badge>
                  <BadgeDollarSign />
                </Badge>
                Sell Your Course
              </h2>
              <PriceForm initialData={Course} courseId={CourseId} />
            </div>
            <div>
              <h2 className="flex items-center gap-4 text-[20px] font-bold mt-7">
                <Badge>
                  <Sliders />
                </Badge>
                Resources & Attachments
              </h2>
              <AttachmentForm initialData={Course} courseId={CourseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePageDetails;
