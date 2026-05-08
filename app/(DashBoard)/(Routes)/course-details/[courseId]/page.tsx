export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle2,
  PlayCircle,
  Lock,
  ArrowLeft,
  User,
} from "lucide-react";
import Link from "next/link";
import EnrollButton from "./_components/EnrollButton";

const CourseDetailsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { userId } = auth();

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      category: true,
      purchase: userId
        ? {
            where: {
              userId,
            },
          }
        : false,
    },
  });

  if (!course) {
    return redirect("/explore");
  }

  // Fetch creator profile
  let creator: any = null;
  try {
    creator = await (db as any).userProfile.findUnique({
      where: { clerkId: course.userId },
      select: {
        clerkId: true,
        displayName: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        headline: true,
        bio: true,
        occupation: true,
        company: true,
      },
    });
  } catch (e) {
    // Profile not available
  }

  // Fetch reviews
  let reviews: any[] = [];
  let averageRating = 0;
  try {
    reviews = await (db as any).review.findMany({
      where: { courseId },
      orderBy: { createdAt: "desc" },
    });
    if (reviews.length > 0) {
      averageRating =
        Math.round(
          (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
            reviews.length) *
            10
        ) / 10;
    }
  } catch (e) {}

  // Fetch reviewer profiles
  let reviewerProfiles: any[] = [];
  if (reviews.length > 0) {
    try {
      const reviewerIds = [...new Set(reviews.map((r: any) => r.userId))];
      reviewerProfiles = await (db as any).userProfile.findMany({
        where: { clerkId: { in: reviewerIds } },
        select: {
          clerkId: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      });
    } catch (e) {}
  }
  const reviewerMap = new Map(
    reviewerProfiles.map((p: any) => [p.clerkId, p])
  );

  const creatorName =
    creator?.displayName ||
    `${creator?.firstName || ""} ${creator?.lastName || ""}`.trim() ||
    "Instructor";

  const purchase =
    userId && course.purchase?.length > 0 ? course.purchase[0] : null;

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F288B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Image */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={course.imgUrl || "https://placehold.co/800x450"}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Course Info */}
            <div className="space-y-4">
              {/* Category Badge */}
              {course.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E3DFFF] text-[#2F288B]">
                  {course.category.name}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {course.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {averageRating > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-gray-700">
                      {averageRating.toFixed(1)}
                    </span>
                    <span>({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#2F288B]" />
                  {course.chapter.length}{" "}
                  {course.chapter.length === 1 ? "Chapter" : "Chapters"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#2F288B]" />
                  Self-paced
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#2F288B]" />
                  All Levels
                </span>
              </div>

              {/* Creator inline */}
              {creator && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {creator.profileImage ? (
                      <Image
                        src={creator.profileImage}
                        alt={creatorName}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E3DFFF] flex items-center justify-center">
                        <span className="text-xs font-bold text-[#2F288B]">
                          {creatorName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {creatorName}
                    </p>
                    {creator.headline && (
                      <p className="text-xs text-gray-500">
                        {creator.headline}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About This Course
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {course.description ||
                  "No description available for this course."}
              </p>
            </div>

            {/* Instructor Section */}
            {creator && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Instructor
                </h2>
                <Link
                  href={`/instructor/${course.userId}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-[#E3DFFF]">
                    {creator.profileImage ? (
                      <Image
                        src={creator.profileImage}
                        alt={creatorName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E3DFFF] flex items-center justify-center">
                        <User className="w-7 h-7 text-[#2F288B]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#2F288B] transition-colors">
                      {creatorName}
                    </h3>
                    {(creator.occupation || creator.company) && (
                      <p className="text-sm text-[#2F288B] font-medium mt-0.5">
                        {creator.occupation}
                        {creator.occupation && creator.company && " at "}
                        {creator.company}
                      </p>
                    )}
                    {creator.headline && (
                      <p className="text-sm text-gray-500 mt-1">
                        {creator.headline}
                      </p>
                    )}
                    {creator.bio && (
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-4">
                        {creator.bio}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#2F288B] group-hover:underline">
                      View full profile →
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What You&apos;ll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.chapter.slice(0, 6).map((ch) => (
                  <div key={ch.id} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#2F288B] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      {ch.chapterTitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Curriculum
              </h2>
              <div className="space-y-2">
                {course.chapter.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f3f3f3] transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E3DFFF] text-[#2F288B] text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    {chapter.ifFree || purchase ? (
                      <PlayCircle className="w-5 h-5 text-[#2F288B] flex-shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Student Reviews
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-lg font-bold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="mb-6 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(
                      (r: any) => r.rating === star
                    ).length;
                    const percentage =
                      reviews.length > 0
                        ? (count / reviews.length) * 100
                        : 0;
                    return (
                      <div
                        key={star}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-3 text-gray-600">{star}</span>
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-gray-500 text-xs">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.slice(0, 5).map((review: any) => {
                    const reviewer = reviewerMap.get(review.userId) as any;
                    const reviewerName =
                      reviewer?.displayName ||
                      `${reviewer?.firstName || ""} ${reviewer?.lastName || ""}`.trim() ||
                      "Student";
                    return (
                      <div
                        key={review.id}
                        className="border-t border-gray-100 pt-4"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#E3DFFF] flex items-center justify-center flex-shrink-0">
                            {reviewer?.profileImage ? (
                              <Image
                                src={reviewer.profileImage}
                                alt={reviewerName}
                                width={32}
                                height={32}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span className="text-xs font-bold text-[#2F288B]">
                                {reviewerName.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {reviewerName}
                            </p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3 h-3 ${
                                    s <= review.rating
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-400 ml-2">
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-gray-600 ml-11">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-5">
              {/* Price */}
              <div className="text-center">
                {course.price ? (
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-gray-900">
                      ${course.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">One-time payment</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-[#2F288B]">Free</p>
                    <p className="text-sm text-gray-500">Full access</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Enroll Button */}
              <EnrollButton
                courseId={course.id}
                price={course.price || 0}
                isPurchased={!!purchase}
                firstChapterId={course.chapter[0]?.id}
              />

              {/* Instructor mini card */}
              {creator && (
                <>
                  <div className="border-t border-gray-100" />
                  <Link
                    href={`/instructor/${course.userId}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {creator.profileImage ? (
                        <Image
                          src={creator.profileImage}
                          alt={creatorName}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#E3DFFF] flex items-center justify-center">
                          <span className="text-sm font-bold text-[#2F288B]">
                            {creatorName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#2F288B] transition-colors">
                        {creatorName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {creator.headline || "Instructor"}
                      </p>
                    </div>
                  </Link>
                </>
              )}

              {/* Course Includes */}
              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold text-gray-900">
                  This course includes:
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PlayCircle className="w-4 h-4 text-[#2F288B]" />
                    <span>{course.chapter.length} video lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-[#2F288B]" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#2F288B]" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-[#2F288B]" />
                    <span>Progress tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
