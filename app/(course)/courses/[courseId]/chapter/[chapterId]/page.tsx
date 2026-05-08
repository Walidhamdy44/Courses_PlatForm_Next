import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayer from "../../_components/VideoPlayer";
import ChapterCompleteSec from "../../_components/ChapterCompleteSec";
import CourseReview from "../../_components/CourseReview";
import { AlertTriangle } from "lucide-react";

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

  if (!chapter || !course) {
    return redirect("/");
  }

  // Fetch existing review if user has purchased
  let existingReview = null;
  if (purchase) {
    try {
      existingReview = await (db as any).review.findUnique({
        where: {
          userId_courseId: { userId, courseId },
        },
        select: { rating: true, comment: true },
      });
    } catch (e) {}
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Locked Banner */}
      {!purchase && !chapter.ifFree && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            This chapter is locked. Purchase the course to unlock all content.
          </p>
        </div>
      )}

      {/* Video Player */}
      <VideoPlayer
        vidUrl={chapter.videoUrl!}
        isFree={chapter.ifFree!}
        purchase={purchase}
      />

      {/* Chapter Content */}
      <ChapterCompleteSec
        title={chapter.chapterTitle}
        desc={chapter.description || ""}
        complete={userProgress?.isCompleted ?? false}
        purchase={purchase}
        attachments={attachments}
        price={course.price!}
        courseId={course.id}
        userId={userId}
        chapterId={chapter.id}
      />

      {/* Review Section - only for purchased users */}
      {purchase && (
        <CourseReview courseId={courseId} existingReview={existingReview} />
      )}
    </div>
  );
};

export default ChapterPage;
