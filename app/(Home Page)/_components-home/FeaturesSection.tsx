import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Star } from "lucide-react";

interface Props {
  courses: any[];
}

export default function FeaturesSection({ courses }: Props) {
  if (courses.length === 0) return null;

  return (
    <section id="courses" className="py-24 px-6 max-w-[1280px] mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 max-w-3xl mx-auto">
        Learning made simple, accessible, &amp; effective
      </h2>
      <p className="text-gray-500 mt-4 max-w-xl mx-auto">
        Explore our latest courses and start building new skills today
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/course-details/${course.id}`}
            className="group flex flex-col items-start text-left bg-white p-0 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden relative">
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
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 w-full">
              {/* Category */}
              {course.category && (
                <span className="bg-indigo-900/10 text-indigo-900 px-3 py-1 rounded text-xs font-bold uppercase mb-3 w-fit">
                  {course.category.name}
                </span>
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 group-hover:text-[#2F288B] transition-colors line-clamp-2">
                {course.title}
              </h3>

              {/* Meta */}
              <div className="flex items-center gap-4 text-gray-500 text-sm mt-auto">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {course.chapter?.length || 0} chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {course.purchase?.length || 0} students
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                {course.price ? (
                  <span className="text-lg font-bold text-[#2F288B]">
                    ${course.price.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-lg font-bold text-emerald-600">
                    Free
                  </span>
                )}
                <span className="text-xs text-[#2F288B] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Course →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/explore"
        className="inline-block mt-12 bg-indigo-900 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
      >
        Browse All Courses →
      </Link>
    </section>
  );
}
