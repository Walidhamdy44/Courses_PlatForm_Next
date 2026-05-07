import { Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Tag } from "lucide-react";

interface Creator {
  clerkId: string;
  displayName: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  headline: string | null;
}

interface CourseCardProps {
  course: Course & { creator?: Creator | null };
  nChapters: number;
  cat: string;
}

const CourseCard = ({ course, nChapters, cat }: CourseCardProps) => {
  const creator = (course as any).creator as Creator | null;
  const creatorName =
    creator?.displayName ||
    `${creator?.firstName || ""} ${creator?.lastName || ""}`.trim() ||
    "Instructor";

  return (
    <Link
      href={`/course-details/${course.id}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Image
          alt={course.title}
          src={course.imgUrl || "https://placehold.co/600x400"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        {cat && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            <Tag className="w-3 h-3" />
            {cat}
          </span>
        )}

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>

        {/* Creator */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {creator?.profileImage ? (
              <Image
                src={creator.profileImage}
                alt={creatorName}
                width={24}
                height={24}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-[#E3DFFF] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#2F288B]">
                  {creatorName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500 truncate">{creatorName}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <BookOpen className="w-3.5 h-3.5" />
            {nChapters} {nChapters === 1 ? "chapter" : "chapters"}
          </span>

          {course.price ? (
            <span className="text-sm font-bold text-emerald-600">
              ${course.price.toFixed(2)}
            </span>
          ) : (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Free
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
