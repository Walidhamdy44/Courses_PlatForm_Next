import Banner from "@/components/Banner";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayer from "../../../_components/VideoPlayer";
import ChapterCompleteSec from "../../../_components/ChapterCompleteSec";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      isPublished: true,
    },
  });

  //

  const attachments = await db.attachment.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  //
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      purchase: true,
    },
  });

  //
  return (
    <div>
      {course!.purchase.length < 1 ? (
        <Banner message="⚠️      This Chapter is Locked!" />
      ) : null}
      <div className="flex flex-col gap-3 py-[30px]">
        <VideoPlayer vidUrl={chapter?.videoUrl!} isFree={chapter?.ifFree!} />
        <ChapterCompleteSec
          title={chapter?.chapterTitle!}
          desc={chapter?.description!}
          complete={chapter?.isCompleted!}
          purchase={course?.purchase!}
          attachments={attachments}
          price={course?.price!}
          courseId={course?.id!}
          userId={userId!}
        />
      </div>
    </div>
  );
};

export default ChapterIdPage;
