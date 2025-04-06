import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchNavBar from "../../_components/SearchNavBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourse } from "@/actions/get-courses";
import CourseCard from "./_components/CourseCard";
import NoCourses from "./_components/NoCourses";

interface ExplorePageProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

const ExplorePage = async ({ searchParams }: ExplorePageProps) => {
  const { userId } = await auth(); // <-- await here
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
    ...searchParams,
  });
  return (
    <div className="p-6">
      <div className="w-[95%] block md:hidden mb-[30px]">
        <SearchNavBar />
      </div>
      <Categories items={categories} />
      <div className="grid mt-[30px] gap-x-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard
              course={course}
              nChapters={course.chapter.length}
              cat={course.category?.name!}
            />
          </div>
        ))}
      </div>
      {courses.length === 0 && <NoCourses />}
    </div>
  );
};

export default ExplorePage;
