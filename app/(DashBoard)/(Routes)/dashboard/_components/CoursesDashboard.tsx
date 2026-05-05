import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CoursesDashboard = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  let coursePurchased: any[] = [];

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
              include: {
                userProgress: {
                  where: { userId },
                },
              },
            },
            purchase: { where: { userId } },
          },
        },
      },
    });
  } catch (error) {
    console.log("Error fetching courses:", error);
  }

  if (coursePurchased.length === 0) {
    return <EmptyState />;
  }

  // Calculate stats
  const totalCourses = coursePurchased.length;
  const totalChapters = coursePurchased.reduce(
    (acc, p) => acc + p.course.chapter.length,
    0,
  );
  const completedChapters = coursePurchased.reduce(
    (acc, p) =>
      acc +
      p.course.chapter.filter((ch: any) => ch.userProgress?.[0]?.isCompleted)
        .length,
    0,
  );
  const overallProgress =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Learning</h2>
        <p className="text-gray-500 mt-1">Continue where you left off</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-indigo-500" />}
          label="Enrolled Courses"
          value={totalCourses.toString()}
          bg="bg-indigo-50"
        />
        <StatCard
          icon={<GraduationCap className="w-5 h-5 text-emerald-500" />}
          label="Chapters Completed"
          value={`${completedChapters}/${totalChapters}`}
          bg="bg-emerald-50"
        />
        <StatCard
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
          label="Overall Progress"
          value={`${overallProgress}%`}
          bg="bg-amber-50"
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {coursePurchased.map((purchase) => {
          const course = purchase.course;
          const chapters = course.chapter;
          const completed = chapters.filter(
            (ch: any) => ch.userProgress?.[0]?.isCompleted,
          ).length;
          const progress =
            chapters.length > 0
              ? Math.round((completed / chapters.length) * 100)
              : 0;

          return (
            <Link
              key={purchase.id}
              href={`/courses/${course.id}`}
              className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  alt={course.title}
                  src={course.imgUrl || "https://placehold.co/600x400"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Progress overlay */}
                {progress === 100 && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ✓ Completed
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Category Badge */}
                {course.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                    {course.category.name}
                  </span>
                )}

                {/* Title */}
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {chapters.length} chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {completed}/{chapters.length} done
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <Progress value={progress} className="h-2 bg-gray-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      {progress}% complete
                    </span>
                    <span className="text-xs text-indigo-600 font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Continue <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

function StatCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
      <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-gray-100">
        <div className="p-4 rounded-full bg-indigo-100 mb-4">
          <GraduationCap className="w-10 h-10 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Start Your Learning Journey
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          You haven&apos;t enrolled in any courses yet. Explore our catalog and
          find the perfect course to boost your skills.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Explore Courses
        </Link>
      </div>
    </div>
  );
}

export default CoursesDashboard;
