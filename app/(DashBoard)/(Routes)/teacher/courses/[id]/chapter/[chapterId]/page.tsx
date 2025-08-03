import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { Eye, MoveLeft as MoveLeftIcon, VideoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Banner from "@/components/Banner";
import { auth } from "@clerk/nextjs/server";
import PublishChapter from "../_components/PubishChapter";
import TitleChapterForm from "../_components/titleChapterForm";
import DescriptionChapterForm from "../_components/DescriptionChapterForm";
import SelectType from "../_components/SelectType";

interface PageProps {
  params: Promise<{
    id: string;
    chapterId: string;
  }>;
}

const ChapterPage = async ({ params }: PageProps) => {
  const { id, chapterId } = await params;
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

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
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished ? (
        <Banner message="⚠️    This Chapter is Not Published " />
      ) : (
        <Banner
          message=" ✔️     Now This Chapter Is Published 🤍"
          color="bg-green-400"
        />
      )}
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
          <div className="flex items-center gap-x-4 justify-between">
            <h2 className="text-[23px] font-extrabold">Chapter Setup </h2>
            <PublishChapter
              isPublished={chapter.isPublished}
              courseId={id}
              chapterId={chapterId}
              canPublished={isComplete}
            />
          </div>
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
              <h2 className="flex items-center gap-4 text-[20px] font-bold">
                <Badge>
                  <VideoIcon />
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
                <SelectType
                  initialData={chapter}
                  courseId={id}
                  chapterId={chapterId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterPage;
