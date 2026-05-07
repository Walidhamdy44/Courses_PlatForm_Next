import { db } from "@/lib/db";

type CourseType = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourse = async ({ userId, title, categoryId }: CourseType) => {
  try {
    const courses = await db.course.findMany({
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

    // Fetch creator profiles for all courses
    const creatorIds = [...new Set(courses.map((c) => c.userId))];
    const creators = await (db as any).userProfile.findMany({
      where: {
        clerkId: { in: creatorIds },
      },
      select: {
        clerkId: true,
        displayName: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        headline: true,
      },
    });

    const creatorMap = new Map(
      creators.map((c: any) => [c.clerkId, c])
    );

    // Attach creator info to each course
    const coursesWithCreator = courses.map((course) => ({
      ...course,
      creator: creatorMap.get(course.userId) || null,
    }));

    return coursesWithCreator;
  } catch (err) {
    console.log("getCourses" + err);
    return [];
  }
};
