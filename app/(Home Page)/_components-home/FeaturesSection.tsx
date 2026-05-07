import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAElECPt1voxn5fQNtf-llGHBPL9Dp8_nZrdsQx2-yl71OUwyAGU65ImXEnJ80UEN5pZHmY9Wszj8ud8yuygZ0D0VsdRFbnH1qblaSqWxaQUm95ZLdyNQxerqxDETx2Jda1yuyVtxlL9WO0LQzo-ui1DA2xvY2xsEKfwglGLxXDvgEZfGvJVwZJDTNOdN252jWhl5-aED0Hzlzxnd4f7x5zlQBZeUuSChY1WmDLdkpIKnMe43dsFaK9ngo1untp8PB5xAo4Yd4FOAN6",
    category: "Editing",
    title: "Advanced Editing in Final Cut",
    date: "22 May",
    alt: "Advanced Editing",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkjGKMzwpEL3JSaGA_fmnrl9D9F6DHgjpbV5_8jhQB8PvnX8OaWjtSOzEtdOcSxvUEl4a8nqT6ooMasLqIEyURGVKBi24Qhyo4AaL7okTugVbkVQWSvuTnEVr8BApfi74alEGUy9pHmNb8bAHUe5kflnmPb8bvS5R3GJ6tFEa5I-SlBqVX4uc__MkyJrR3TjB-35XFZ6BxJbC3VCQ0PHDRK-oomxcTBsf9ameOsa7VDN2eUDF8Amx98sd-jDUdDAFtkvCeGO60_qK5",
    category: "UI/UX Design",
    title: "Advanced Design with Illustrator",
    date: "12 Mar",
    alt: "Advanced Design",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYOeF670GiwHLQeyPBpG8rWOqCT0nF6qPFVgR0K80kafcstjCjHJzXpTMzAqxaLz7grxlDrhSF1QT3-lMt6oW_Y95bS5tBf9E1a-EyIguu3qNplsUbtP2lBYRVofnqTR2TyJQ6Xdq4IKlbCW7gcUJGJGnSBDqzN-xzRCSeybpB9OvMVw__UdstmXlqhE-Z_nf6ecomX8iCpEHM8CTOIR1fXssspLE4t0B2iKRu6HgleuLMTpRw1zBhSr3mtd8hojS2pxjQBdeyOjiR",
    category: "Copywriting",
    title: "Advanced Copywriting and SEO",
    date: "15 Oct",
    alt: "Advanced Copywriting",
  },
];

export default function FeaturesSection() {
  return (
    <section id="courses" className="py-24 px-6 max-w-[1280px] mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 max-w-3xl mx-auto">
        Learning made simple, accessible, &amp; effective
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {courses.map((course) => (
          <div
            key={course.title}
            className="flex flex-col items-start text-left bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
              <Image
                src={course.image}
                alt={course.alt}
                width={400}
                height={192}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="bg-indigo-900/10 text-indigo-900 px-3 py-1 rounded text-xs font-bold uppercase mb-3">
              {course.category}
            </div>
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                    clipRule="evenodd"
                  />
                </svg>
                {course.date}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10.75 10.818a4.5 4.5 0 01-6.364-6.364l3.182-3.182a4.5 4.5 0 016.364 0 4.5 4.5 0 010 6.364l-3.182 3.182z" />
                </svg>
                Learn
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard"
        className="inline-block mt-12 bg-indigo-900 text-white px-8 py-3 rounded-md font-bold hover:opacity-90 transition-opacity"
      >
        All Courses →
      </Link>
    </section>
  );
}
