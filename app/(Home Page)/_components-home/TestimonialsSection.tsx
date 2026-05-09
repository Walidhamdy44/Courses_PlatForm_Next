import Image from "next/image";
import Link from "next/link";
import { BookOpen, User } from "lucide-react";

interface Props {
  instructors: any[];
}

export default function TestimonialsSection({ instructors }: Props) {
  if (instructors.length === 0) return null;

  return (
    <section id="mentors" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Meet With World class
          <br />
          &amp; expert mentors
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Learn from the best instructors who are passionate about teaching
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {instructors.map((instructor) => {
            const name =
              instructor.displayName ||
              `${instructor.firstName || ""} ${instructor.lastName || ""}`.trim() ||
              "Instructor";

            return (
              <Link
                key={instructor.clerkId}
                href={`/instructor/${instructor.clerkId}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                {/* Avatar */}
                <div className="aspect-[3/4] w-full overflow-hidden relative bg-gradient-to-br from-[#170777] to-[#5652b3]">
                  {instructor.profileImage ? (
                    <Image
                      src={instructor.profileImage}
                      alt={name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-24 h-24 text-white/30" />
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                    <span className="bg-[#2F288B] text-white text-[10px] font-bold uppercase w-fit px-2.5 py-1 rounded mb-2">
                      {instructor.occupation || "Instructor"}
                    </span>
                    <h4 className="text-white font-bold text-lg">{name}</h4>
                    {instructor.headline && (
                      <p className="text-white/70 text-sm mt-1 line-clamp-1">
                        {instructor.headline}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-2 text-white/60 text-xs">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>
                        {instructor.courseCount}{" "}
                        {instructor.courseCount === 1 ? "course" : "courses"} published
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
