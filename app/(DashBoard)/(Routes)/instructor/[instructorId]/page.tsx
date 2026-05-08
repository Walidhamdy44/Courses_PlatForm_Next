export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  User,
  MapPin,
  Briefcase,
  BookOpen,
  Users,
  Globe,
  Github,
  Linkedin,
  Twitter,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import FollowButton from "./_components/FollowButton";

const InstructorProfilePage = async ({
  params,
}: {
  params: Promise<{ instructorId: string }>;
}) => {
  const { instructorId } = await params;
  const { userId } = auth();

  // Fetch instructor profile
  let instructor: any = null;
  try {
    instructor = await (db as any).userProfile.findUnique({
      where: { clerkId: instructorId },
    });
  } catch (e) {}

  if (!instructor) {
    return redirect("/explore");
  }

  // Fetch instructor's published courses
  const courses = await db.course.findMany({
    where: {
      userId: instructorId,
      isPublished: true,
    },
    include: {
      chapter: {
        where: { isPublished: true },
        select: { id: true },
      },
      category: true,
    },
    orderBy: { created_at: "desc" },
  });

  // Get follower count
  let followerCount = 0;
  try {
    followerCount = await (db as any).follow.count({
      where: { followingId: instructorId },
    });
  } catch (e) {}

  // Check if current user is following
  let isFollowing = false;
  if (userId && userId !== instructorId) {
    try {
      const follow = await (db as any).follow.findFirst({
        where: {
          followerId: userId,
          followingId: instructorId,
        },
      });
      isFollowing = !!follow;
    } catch (e) {}
  }

  // Total students (unique purchases across all courses)
  const totalStudents = await db.purchase.count({
    where: {
      courseId: { in: courses.map((c) => c.id) },
    },
  });

  const displayName =
    instructor.displayName ||
    `${instructor.firstName || ""} ${instructor.lastName || ""}`.trim() ||
    "Instructor";

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Back Navigation */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F288B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Cover gradient */}
          <div className="h-32 bg-gradient-to-r from-[#2F288B] to-[#5652b3]" />

          {/* Profile info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-4 border-white shadow-md flex-shrink-0">
                {instructor.profileImage ? (
                  <Image
                    src={instructor.profileImage}
                    alt={displayName}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E3DFFF] flex items-center justify-center">
                    <User className="w-10 h-10 text-[#2F288B]" />
                  </div>
                )}
              </div>

              {/* Name & Actions */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full pt-2 sm:pt-0">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {displayName}
                  </h1>
                  {instructor.headline && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {instructor.headline}
                    </p>
                  )}
                </div>

                {/* Follow Button */}
                {userId && userId !== instructorId && (
                  <FollowButton
                    instructorId={instructorId}
                    isFollowing={isFollowing}
                    followerCount={followerCount}
                  />
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-5 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2F288B]" />
                <span className="text-sm text-gray-700">
                  <strong>{courses.length}</strong>{" "}
                  {courses.length === 1 ? "Course" : "Courses"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2F288B]" />
                <span className="text-sm text-gray-700">
                  <strong>{totalStudents}</strong>{" "}
                  {totalStudents === 1 ? "Student" : "Students"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2F288B]" />
                <span className="text-sm text-gray-700">
                  <strong>{followerCount}</strong>{" "}
                  {followerCount === 1 ? "Follower" : "Followers"}
                </span>
              </div>
              {(instructor.city || instructor.country) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {[instructor.city, instructor.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About & Social */}
          <div className="space-y-6">
            {/* About */}
            {instructor.bio && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  About
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {instructor.bio}
                </p>
              </div>
            )}

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Details</h2>

              {(instructor.occupation || instructor.company) && (
                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-[#2F288B] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {instructor.occupation || "Professional"}
                    </p>
                    {instructor.company && (
                      <p className="text-xs text-gray-500">
                        at {instructor.company}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {instructor.educationLevel && (
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-[#2F288B] mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {instructor.educationLevel}
                  </p>
                </div>
              )}

              {instructor.skills?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {instructor.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#E3DFFF] text-[#2F288B]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            {(instructor.website ||
              instructor.github ||
              instructor.linkedin ||
              instructor.twitter) && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Connect
                </h2>
                <div className="space-y-2.5">
                  {instructor.website && (
                    <a
                      href={instructor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#2F288B] transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="truncate">{instructor.website}</span>
                    </a>
                  )}
                  {instructor.github && (
                    <a
                      href={instructor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#2F288B] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="truncate">{instructor.github}</span>
                    </a>
                  )}
                  {instructor.linkedin && (
                    <a
                      href={instructor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#2F288B] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="truncate">{instructor.linkedin}</span>
                    </a>
                  )}
                  {instructor.twitter && (
                    <a
                      href={instructor.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#2F288B] transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      <span className="truncate">{instructor.twitter}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Courses by {displayName}
              </h2>

              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/course-details/${course.id}`}
                      className="group block rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                        <Image
                          src={
                            course.imgUrl || "https://placehold.co/400x225"
                          }
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3.5 space-y-2">
                        {course.category && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E3DFFF] text-[#2F288B]">
                            {course.category.name}
                          </span>
                        )}
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#2F288B] transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {course.chapter.length} chapters
                          </span>
                          {course.price ? (
                            <span className="font-bold text-emerald-600">
                              ${course.price.toFixed(2)}
                            </span>
                          ) : (
                            <span className="font-semibold text-emerald-600">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  No courses published yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfilePage;
