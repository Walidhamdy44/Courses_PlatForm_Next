import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CourseCard from "../../explore/_components/CourseCard";
import Link from "next/link";

const CoursesDashboard = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  let coursePurchased: Array<{
    id: string;
    course: {
      id: string;
      userId: string;
      title: string;
      description: string | null;
      imgUrl: string | null;
      price: number | null;
      isPublished: boolean;
      categoryId: string | null;
      created_at: Date;
      updated_at: Date;
      category: { name: string } | null;
      chapter: Array<{ isPublished: boolean }>;
    };
  }> = [];

  try {
    coursePurchased = await db.purchase.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            category: true,
            chapter: {
              where: {
                isPublished: true,
              },
            },
            purchase: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("Error fetching courses:");
    // Optionally, you can handle the error by showing a message to the user
  }

  return (
    <>
      {coursePurchased.length > 0 ? (
        <div className="flex items-start flex-col gap-4 w-full p-4 bg-gray-100 min-h-screen">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
            <p className="text-lg text-gray-700 mb-4">
              Here you can find all the courses you have purchased. Browse
              through your collection and continue your learning journey.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursePurchased.map((course) => {
              return (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <CourseCard
                    cat={course.course.category?.name || ""}
                    nChapters={course.course.chapter.length}
                    course={course.course}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className=" p-4">
          <div className="relative flex items-center justify-between gap-4 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg">
            <p className="text-sm font-medium">
              You Dont Have any Courses yet!
              <span className="inline-block font-bold pl-5">
                Check out this new course!
              </span>
            </p>

            <button
              aria-label="Close"
              className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
            >
              <Link href="/explore">Get Course!</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesDashboard;
