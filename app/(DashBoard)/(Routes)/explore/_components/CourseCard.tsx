import { Badge } from "@/components/ui/badge";
import { Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FcBookmark } from "react-icons/fc";

interface card {
  course: Course;
  nChapters: number;
  cat: string | "";
}

const CourseCard = ({ course, nChapters, cat }: card) => {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="block rounded-lg p-4 shadow-sm shadow-indigo-100 transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-300"
    >
      <div className="relative aspect-video w-full transition-opacity duration-300 hover:opacity-90">
        <Image
          alt={course.title}
          src={course.imgUrl || ""}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Price</dt>
            {course.purchase.length !== 0 ? (
              <dd className="text-sm text-gray-500">
                <Badge>Purchased</Badge>
              </dd>
            ) : (
              <dd className="text-sm text-gray-500">
                <Badge>${course.price}</Badge>
              </dd>
            )}
          </div>

          <div className="mt-2">
            <dt className="sr-only">Title</dt>

            <dd className="font-medium">{course.title}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-4 text-xs justify-between">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Chapters</p>

              <p className="font-medium">
                {nChapters}
                {"  "}
                {+nChapters > 1 ? "chapters" : "chapter"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FcBookmark className="w-4 h-4" />

            <div className="">
              <p className="font-medium">{cat}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
