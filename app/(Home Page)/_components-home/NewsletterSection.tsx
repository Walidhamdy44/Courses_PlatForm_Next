import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAElECPt1voxn5fQNtf-llGHBPL9Dp8_nZrdsQx2-yl71OUwyAGU65ImXEnJ80UEN5pZHmY9Wszj8ud8yuygZ0D0VsdRFbnH1qblaSqWxaQUm95ZLdyNQxerqxDETx2Jda1yuyVtxlL9WO0LQzo-ui1DA2xvY2xsEKfwglGLxXDvgEZfGvJVwZJDTNOdN252jWhl5-aED0Hzlzxnd4f7x5zlQBZeUuSChY1WmDLdkpIKnMe43dsFaK9ngo1untp8PB5xAo4Yd4FOAN6",
    date: "June 15, 2024",
    title: "Advanced Editing in Final Cut",
    alt: "Advanced Editing",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBe7ClxcFQIYVIDW3wbEeDfSehh0WL8dIM07mlegR5R_F12A2Chmxlze1oubcaNXYwjpwciqoRsfwtAbjLW8TvZc0pRsZ6MHHpC2_OLxJ39xOEbuGhHTMEyeTHAgzil6l2Y9Iiky8o962ECMewcvQ8pXAGUkh-bH6jaooCIL4CGs_IcDa5DOSvf-ngq_7l98OQn87f97BkJoLOTbfiOcQDTW21V8vMx8R9vlMnJwG33Lul3UckoL3FxPhlp_LAGA74gcAGMltbnoLhG",
    date: "May 10, 2024",
    title: "Mastering Premiere Pro",
    alt: "Mastering Premiere",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkjGKMzwpEL3JSaGA_fmnrl9D9F6DHgjpbV5_8jhQB8PvnX8OaWjtSOzEtdOcSxvUEl4a8nqT6ooMasLqIEyURGVKBi24Qhyo4AaL7okTugVbkVQWSvuTnEVr8BApfi74alEGUy9pHmNb8bAHUe5kflnmPb8bvS5R3GJ6tFEa5I-SlBqVX4uc__MkyJrR3TjB-35XFZ6BxJbC3VCQ0PHDRK-oomxcTBsf9ameOsa7VDN2eUDF8Amx98sd-jDUdDAFtkvCeGO60_qK5",
    date: "April 22, 2024",
    title: "Graphic Design Principles",
    alt: "Graphic Design",
  },
];

export default function NewsletterSection() {
  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16">Latest From Our Blog</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="bg-white rounded-2xl p-4 text-left border border-gray-200"
            >
              <Image
                src={post.image}
                alt={post.alt}
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-xl mb-4"
                unoptimized
              />
              <span className="text-xs text-gray-500 font-medium">
                📅 {post.date}
              </span>
              <h4 className="text-lg font-bold mt-2 mb-4">{post.title}</h4>
              <Link
                href="#"
                className="text-indigo-900 font-bold text-sm"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
