export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  BadgeCheck,
  Star,
  Brain,
  Mail,
  Calendar,
  Clock,
  Target,
  Heart,
} from "lucide-react";
import FollowButton from "./_components/FollowButton";

const InstructorProfilePage = async ({
  params,
}: {
  params: Promise<{ instructorId: string }>;
}) => {
  const { instructorId } = await params;
  const { userId } = await auth();

  let instructor: any = null;
  try {
    instructor = await (db as any).userProfile.findUnique({
      where: { clerkId: instructorId },
    });
  } catch (e) {}

  if (!instructor) {
    return redirect("/explore");
  }

  const courses = await (db as any).course.findMany({
    where: { userId: instructorId, isPublished: true },
    include: {
      chapter: { where: { isPublished: true }, select: { id: true } },
      category: true,
      purchase: true,
      reviews: { select: { rating: true } },
    },
    orderBy: { created_at: "desc" },
  });

  let followerCount = 0;
  try {
    followerCount = await (db as any).follow.count({
      where: { followingId: instructorId },
    });
  } catch (e) {}

  let isFollowing = false;
  if (userId && userId !== instructorId) {
    try {
      const follow = await (db as any).follow.findFirst({
        where: { followerId: userId, followingId: instructorId },
      });
      isFollowing = !!follow;
    } catch (e) {}
  }

  const totalStudents = await db.purchase.count({
    where: { courseId: { in: courses.map((c: any) => c.id) } },
  });

  const displayName =
    instructor.displayName ||
    `${instructor.firstName || ""} ${instructor.lastName || ""}`.trim() ||
    "Instructor";

  const location = [instructor.city, instructor.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Cover */}
        <div className="h-56 md:h-72 w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#170777] via-[#2F288B] to-[#5652b3]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-20 w-96 h-96 bg-[#C3C0FF]/10 rounded-full blur-3xl" />
          </div>
          {/* Back button on cover */}
          <div className="absolute top-6 left-6 z-10">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="max-w-[1280px] mx-auto px-6 relative -mt-20 md:-mt-24 pb-8">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-[0_4px_24px_rgba(13,12,34,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5 md:gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  {instructor.profileImage ? (
                    <Image
                      src={instructor.profileImage}
                      alt={displayName}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E3DFFF] flex items-center justify-center">
                      <span className="text-4xl font-bold text-[#2F288B]">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 bg-[#BEBEFE] text-[#4A4B83] p-1.5 rounded-full border-2 border-white">
                  <BadgeCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Name & Info */}
              <div className="text-center md:text-left pb-2">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#1A1C1C]">
                    {displayName}
                  </h1>
                  <span className="px-3 py-1 bg-[#E3DFFF] text-[#170777] text-xs font-semibold rounded-full uppercase tracking-wider">
                    Instructor
                  </span>
                </div>
                {instructor.headline && (
                  <p className="text-lg text-[#474552] mt-1">
                    {instructor.headline}
                  </p>
                )}
                {location && (
                  <p className="text-sm text-[#777583] mt-1 flex items-center justify-center md:justify-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {location}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pb-2">
              {userId && userId !== instructorId && (
                <FollowButton
                  instructorId={instructorId}
                  isFollowing={isFollowing}
                  followerCount={followerCount}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-10 gap-6 pb-20">
        {/* Left Column (70%) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* About */}
          {instructor.bio && (
            <section className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(13,12,34,0.05)]">
              <h2 className="text-xl font-semibold text-[#1A1C1C] mb-4 flex items-center gap-3">
                <User className="w-5 h-5 text-[#170777]" />
                About
              </h2>
              <p className="text-[15px] text-[#474552] leading-relaxed whitespace-pre-line">
                {instructor.bio}
              </p>
            </section>
          )}

          {/* Skills & Interests */}
          {(instructor.skills?.length > 0 ||
            instructor.interests?.length > 0) && (
            <section className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(13,12,34,0.05)]">
              <h2 className="text-xl font-semibold text-[#1A1C1C] mb-5 flex items-center gap-3">
                <Brain className="w-5 h-5 text-[#170777]" />
                Skills &amp; Interests
              </h2>

              {instructor.skills?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#777583] uppercase tracking-wider mb-3">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-[#E3DFFF] text-[#2F288B] rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {instructor.interests?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#777583] uppercase tracking-wider mb-3">
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.interests.map((interest: string) => (
                      <span
                        key={interest}
                        className="px-4 py-2 bg-[#EEEEEE] text-[#474552] rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Courses */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#1A1C1C] flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#170777]" />
                Courses by {instructor.firstName || displayName}
              </h2>
              <span className="text-sm text-[#777583]">
                {courses.length} {courses.length === 1 ? "course" : "courses"}
              </span>
            </div>

            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {courses.map((course:any) => (
                  <Link
                    key={course.id}
                    href={`/course-details/${course.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(13,12,34,0.05)] group hover:shadow-[0_8px_30px_rgba(13,12,34,0.1)] transition-shadow"
                  >
                    <div className="h-44 overflow-hidden relative">
                      {course.imgUrl ? (
                        <Image
                          src={course.imgUrl}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E3DFFF] to-[#C3C0FF] flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-[#2F288B]" />
                        </div>
                      )}
                      {course.category && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-semibold text-[#2F288B]">
                          {course.category.name}
                        </div>
                      )}
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-semibold text-[#474552]">
                        {course.purchase?.length || 0} students
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-[#1A1C1C] mb-1 line-clamp-2 group-hover:text-[#2F288B] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#777583] mb-3">
                        {course.chapter.length}{" "}
                        {course.chapter.length === 1 ? "chapter" : "chapters"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {(() => {
                            const courseReviews = (course as any).reviews as { rating: number }[];
                            const avg = courseReviews.length > 0
                              ? Math.round((courseReviews.reduce((s, r) => s + r.rating, 0) / courseReviews.length) * 10) / 10
                              : 0;
                            return avg > 0 ? (
                              <>
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-sm font-semibold text-[#1A1C1C]">
                                  {avg.toFixed(1)}
                                </span>
                                <span className="text-xs text-[#777583]">
                                  ({courseReviews.length})
                                </span>
                              </>
                            ) : (
                              <>
                                <Star className="w-4 h-4 text-gray-300" />
                                <span className="text-sm text-[#777583]">New</span>
                              </>
                            );
                          })()}
                        </div>
                        {course.price ? (
                          <span className="text-sm font-bold text-[#170777]">
                            ${course.price.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-emerald-600">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(13,12,34,0.05)] text-center">
                <BookOpen className="w-12 h-12 text-[#C8C4D4] mx-auto mb-3" />
                <p className="text-[#777583]">No courses published yet.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column (30%) */}
        <aside className="lg:col-span-3 flex flex-col gap-5">
          {/* Stats Card */}
          <section className="bg-[#170777] text-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,12,34,0.1)]">
            <h3 className="text-xs font-semibold text-[#9A96FD] uppercase tracking-wider mb-5">
              Instructor Stats
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between border-b border-[#2F288B] pb-3">
                <span className="text-sm opacity-80 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Courses
                </span>
                <span className="text-2xl font-bold">{courses.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#2F288B] pb-3">
                <span className="text-sm opacity-80 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Students
                </span>
                <span className="text-2xl font-bold">{totalStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Followers
                </span>
                <span className="text-2xl font-bold">{followerCount}</span>
              </div>
            </div>
          </section>

          {/* Professional Info */}
          {(instructor.company ||
            instructor.occupation ||
            instructor.educationLevel ||
            location) && (
            <section className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,12,34,0.05)]">
              <h3 className="text-xs font-semibold text-[#777583] uppercase tracking-wider mb-5">
                Professional Info
              </h3>
              <ul className="flex flex-col gap-5">
                {(instructor.occupation || instructor.company) && (
                  <li className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-[#2F288B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#777583]">Occupation</p>
                      <p className="text-sm text-[#1A1C1C] font-semibold">
                        {instructor.occupation || "Professional"}
                      </p>
                      {instructor.company && (
                        <p className="text-xs text-[#777583]">
                          at {instructor.company}
                        </p>
                      )}
                    </div>
                  </li>
                )}
                {instructor.educationLevel && (
                  <li className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#2F288B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#777583]">Education</p>
                      <p className="text-sm text-[#1A1C1C] font-semibold">
                        {instructor.educationLevel}
                      </p>
                    </div>
                  </li>
                )}
                {location && (
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2F288B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#777583]">Location</p>
                      <p className="text-sm text-[#1A1C1C] font-semibold">
                        {location}
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </section>
          )}

          {/* Learning Preferences */}
          {(instructor.learningGoal ||
            instructor.experienceLevel ||
            instructor.weeklyHoursAvailable) && (
            <section className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,12,34,0.05)]">
              <h3 className="text-xs font-semibold text-[#777583] uppercase tracking-wider mb-5">
                Learning Profile
              </h3>
              <ul className="flex flex-col gap-5">
                {instructor.experienceLevel && (
                  <li className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#2F288B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#777583]">Experience Level</p>
                      <p className="text-sm text-[#1A1C1C] font-semibold">
                        {instructor.experienceLevel}
                      </p>
                    </div>
                  </li>
                )}
                {instructor.weeklyHoursAvailable > 0 && (
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#2F288B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#777583]">Weekly Availability</p>
                      <p className="text-sm text-[#1A1C1C] font-semibold">
                        {instructor.weeklyHoursAvailable} hours/week
                      </p>
                    </div>
                  </li>
                )}
                {instructor.learningGoal && (
                  <li className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#2F288B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#777583]">Learning Goal</p>
                      <p className="text-sm text-[#1A1C1C] font-semibold">
                        {instructor.learningGoal}
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </section>
          )}

          {/* Social Links */}
          {(instructor.website ||
            instructor.github ||
            instructor.linkedin ||
            instructor.twitter) && (
            <section className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,12,34,0.05)]">
              <h3 className="text-xs font-semibold text-[#777583] uppercase tracking-wider mb-5">
                Connect
              </h3>
              <div className="flex flex-col gap-1">
                {instructor.website && (
                  <a
                    href={instructor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EEEEEE] transition-colors group"
                  >
                    <Globe className="w-5 h-5 text-[#777583] group-hover:text-[#170777] transition-colors" />
                    <span className="text-sm font-medium text-[#1A1C1C]">
                      Website
                    </span>
                  </a>
                )}
                {instructor.github && (
                  <a
                    href={instructor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EEEEEE] transition-colors group"
                  >
                    <Github className="w-5 h-5 text-[#777583] group-hover:text-[#170777] transition-colors" />
                    <span className="text-sm font-medium text-[#1A1C1C]">
                      GitHub
                    </span>
                  </a>
                )}
                {instructor.linkedin && (
                  <a
                    href={instructor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EEEEEE] transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-[#777583] group-hover:text-[#170777] transition-colors" />
                    <span className="text-sm font-medium text-[#1A1C1C]">
                      LinkedIn
                    </span>
                  </a>
                )}
                {instructor.twitter && (
                  <a
                    href={instructor.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EEEEEE] transition-colors group"
                  >
                    <Twitter className="w-5 h-5 text-[#777583] group-hover:text-[#170777] transition-colors" />
                    <span className="text-sm font-medium text-[#1A1C1C]">
                      Twitter / X
                    </span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Member Since */}
          {instructor.createdAt && (
            <section className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,12,34,0.05)]">
              <div className="flex items-center gap-3 text-sm text-[#777583]">
                <Calendar className="w-4 h-4" />
                <span>
                  Member since{" "}
                  {new Date(instructor.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
};

export default InstructorProfilePage;
