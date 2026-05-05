import Banner from "@/components/Banner";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayer from "../../_components/VideoPlayer";
import ChapterCompleteSec from "../../_components/ChapterCompleteSec";

interface ChapterPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { userId } = auth();
  const { courseId, chapterId } = await params;

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      isPublished: true,
    },
  });

  const attachments = await db.attachment.findMany({
    where: {
      courseId: courseId,
    },
  });

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
  });

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: { userId, courseId },
    },
  });

  const userProgress = await db.userProgress.findUnique({
    where: {
      chapterId_userId: { chapterId, userId },
    },
  });

  return (
    <div>
      {purchase === null ? (
        <Banner message="⚠️      This Chapter is Locked!" />
      ) : null}
      <div className="flex flex-col gap-3 py-[30px]">
        <VideoPlayer
          vidUrl={chapter?.videoUrl!}
          isFree={chapter?.ifFree!}
          purchase={purchase}
        />
        <ChapterCompleteSec
          title={chapter?.chapterTitle!}
          desc={chapter?.description!}
          complete={userProgress?.isCompleted ?? false}
          purchase={purchase}
          attachments={attachments}
          price={course?.price!}
          courseId={course?.id!}
          userId={userId!}
          chapterId={chapter?.id!}
        />
      </div>
    </div>
  );
};

export default ChapterPage;
