import Image from "next/image";
import Link from "next/link";

const steps = [
  "Browse from a wide range of expertly designed courses and pick",
  "Access high-quality video lessons and materials at your own pace",
  "Complete your course, earn a certificate, and take the next step in your career.",
];

export default function TrustedLogos() {
  return (
    <section id="how-it-works" className="py-24 px-6 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-20">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-gray-900">How It Work</h2>
          <ul className="flex flex-col gap-6 mt-4">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="text-indigo-900">✦</span>
                <p className="text-gray-600 font-medium">{step}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard"
            className="bg-indigo-900 text-white px-8 py-3 rounded-md font-bold w-fit mt-6 hover:opacity-90 transition-opacity"
          >
            Learn More →
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkjGKMzwpEL3JSaGA_fmnrl9D9F6DHgjpbV5_8jhQB8PvnX8OaWjtSOzEtdOcSxvUEl4a8nqT6ooMasLqIEyURGVKBi24Qhyo4AaL7okTugVbkVQWSvuTnEVr8BApfi74alEGUy9pHmNb8bAHUe5kflnmPb8bvS5R3GJ6tFEa5I-SlBqVX4uc__MkyJrR3TjB-35XFZ6BxJbC3VCQ0PHDRK-oomxcTBsf9ameOsa7VDN2eUDF8Amx98sd-jDUdDAFtkvCeGO60_qK5"
            alt="Two people working together"
            width={600}
            height={450}
            className="w-full rounded-3xl shadow-xl"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
