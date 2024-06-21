import { db } from "@/lib/db";

type CourseType = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourse = async ({ userId, title, categoryId }: CourseType) => {
  try {
    const course = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapter: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return course;
  } catch (err) {
    console.log("getCourses" + err);
    return [];
  }
};
