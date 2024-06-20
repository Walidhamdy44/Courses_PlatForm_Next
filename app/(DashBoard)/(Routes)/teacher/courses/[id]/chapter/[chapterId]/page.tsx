import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Eye, LayoutDashboard, MoveLeftIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import TitleChapterForm from "../_components/titleChapterForm";
import DescriptionChapterForm from "../_components/DescriptionChapterForm";
import ChapterAccesForm from "../_components/ChapterAccesForm";
import ViedoFileUploadForm from "../_components/VideoFileUploadForm";

const ChapterPage = async ({
  params,
}: {
  params: { id: string; chapterId: string };
}) => {
  const { id } = params;
  const { chapterId } = params;
  const { userId } = auth();

  //
  if (!userId) {
    return redirect("/");
  }
  // fitch  Chapter from db
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId: id,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/dashboard");
  }

  const requiredFields = [
    chapter.chapterTitle,
    chapter.description,
    chapter.videoUrl,
    chapter.muxData,
  ];
  const totalFields = requiredFields.length;
  const missingFields = requiredFields.filter(Boolean).length;
  const progressText = (missingFields / totalFields) * 100;

  return (
    <div>
      <div className="p-6">
        <Button variant="secondary" className="hover:shadow-md transition">
          <Link
            className="flex gap-4 items-center"
            href={`/teacher/courses/${id}`}
          >
            <MoveLeftIcon className="w-4 h-4" />
            <span>Back to Course Setup</span>
          </Link>
        </Button>
        <div className="mt-[30px]">
          <h2 className="text-[23px] font-extrabold">Chapter Setup </h2>
          <p className="text-[16px] text-gray-700 py-[20px]">
            Complate All Fields :
            <span className="font-extrabold text-green-600">
              {Math.round(progressText)}%
            </span>
          </p>
          <div className="lg:w-[70%] md:w-full sm:w-full pb-[20px]">
            <Progress value={progressText} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[40px] gap-6">
          <div>
            <div>
              <div>
                <h2 className="flex items-center gap-4 text-[20px] font-bold">
                  <Badge>
                    <LayoutDashboard />
                  </Badge>
                  Custmize Your Chapter
                </h2>
              </div>
              <div>
                <TitleChapterForm
                  initialData={chapter}
                  courseId={id}
                  chapterId={chapterId}
                />
              </div>
              <div>
                <DescriptionChapterForm
                  initialData={chapter}
                  courseId={id}
                  chapterId={chapterId}
                />
              </div>
              <div className="mt-[30px]">
                <div>
                  <h2 className="flex items-center gap-4 text-[20px] font-bold">
                    <Badge>
                      <Eye />
                    </Badge>
                    Chapter Access
                  </h2>
                </div>
                <div>
                  <ChapterAccesForm
                    initialData={chapter}
                    courseId={id}
                    chapterId={chapterId}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2 className="flex items-center gap-4 text-[20px] font-bold">
                <Badge>
                  <VideoIcon />
                </Badge>
                Video Chapter
              </h2>
            </div>
            <div>
              <ViedoFileUploadForm
                initialData={chapter}
                courseId={id}
                chapterId={chapterId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
