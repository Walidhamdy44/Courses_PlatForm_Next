import { db } from "@/lib/db";
import { Attachment } from "@prisma/client";

interface ChapterParams {
  courseId: string;
  chapterId: string;
  userId: string;
}

export const getChapter = async ({
  chapterId,
  courseId,
  userId,
}: ChapterParams) => {
  try {
    // const purchase = await db.purchase.findUnique({
    //   where: { userId, courseId },
    // });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      include: {
        purchase: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];

    // if (purchase) {
    //   attachments = await db.attachment.findMany({
    //     where: {
    //       courseId: courseId,
    //     },
    //   });
    // }

    if (chapter.ifFree) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });
    }

    return {
      course,
      chapter,
      // purchase,
      muxData,
      attachments,
    };
  } catch (err) {
    console.log("Error Get Chapter" + err);
    return {
      course: null,
      chapter: null,
      // purchase: null,
      muxData: null,
      attachments: [],
    };
  }
};
