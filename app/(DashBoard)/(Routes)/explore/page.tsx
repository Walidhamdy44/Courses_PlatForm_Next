export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchNavBar from "../../_components/SearchNavBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourse } from "@/actions/get-courses";
import CourseCard from "./_components/CourseCard";
import NoCourses from "./_components/NoCourses";
import { Compass } from "lucide-react";

const ExplorePage = async ({ searchParams }: { searchParams: any }) => {
  const resolvedSearchParams = await searchParams;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourse({
    userId,
    ...resolvedSearchParams,
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Explore Courses
            </h1>
          </div>
          <p className="text-gray-500">
            Discover courses to expand your skills and advance your career
          </p>
        </div>
        <div className="w-full md:w-80">
          <SearchNavBar />
        </div>
      </div>

      {/* Categories */}
      <Categories items={categories} />

      {/* Results Count */}
      {courses.length > 0 && (
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">{courses.length}</span>{" "}
          course{courses.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Course Grid */}
      {courses.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              nChapters={course.chapter.length}
              cat={course.category?.name || ""}
            />
          ))}
        </div>
      ) : (
        <NoCourses />
      )}
    </div>
  );
};

export default ExplorePage;
