"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full bg-gradient-to-br from-[#dcf8f3] via-[#e6f1f9] to-[#e4e1f9] overflow-hidden pb-48 pt-4">
      {/* Hero Content */}
      <div className="relative z-20 w-full px-6 max-w-[1280px] mx-auto pt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 items-start">
            {/* Welcome Badge */}
            <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white flex items-center gap-2 text-sm font-medium text-gray-700 shadow-sm">
              <span className="text-indigo-900 font-bold">||</span> Welcome to our{" "}
              <span>👉🏽</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-[56px] leading-[1.2] font-extrabold text-gray-900 tracking-tight">
              Learn, Grow, and
              <br />
              Succeed{" "}
              <span className="inline-block bg-indigo-900 text-white px-4 py-1 rounded-lg ml-2 -rotate-2 transform">
                Online
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg max-w-lg leading-relaxed mt-2">
              Learning Management System, a place to learn at your own pace,
              anytime and anywhere. With courses for all ages and interests, you
              can gain new skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link
                href="/dashboard"
                className="bg-indigo-900 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-indigo-800 transition-all duration-200"
              >
                Get Started
              </Link>
              <button className="bg-transparent text-gray-800 border border-gray-400 font-bold px-6 py-3 rounded-full hover:bg-black/5 transition-all duration-200 flex items-center gap-3">
                <div className="bg-gray-700 text-white rounded-full p-1 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Free Trial
              </button>
            </div>
          </div>

          {/* Right Content (Images & Badges) */}
          <div className="relative w-full aspect-[4/3] max-w-lg mx-auto lg:ml-auto mt-12 lg:mt-0">
            {/* Sparkle decorative element */}
            <div className="absolute -top-10 -left-10 text-indigo-200 opacity-90 z-0">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 2v20m10-10H2M19.07 4.93l-14.14 14.14M19.07 19.07L4.93 4.93"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Main Image */}
            <div className="w-full h-full rounded-[40px] overflow-hidden border-[12px] border-white/60 backdrop-blur-sm shadow-2xl relative z-10">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5t3cmQCcubE4-SvfIFXfuqO6v7QszpZTwsIFnPk0abVKGVcdaJ7H0zbzBJzhyRFZgFvPSKQ_QdvX33bWjqViAfucx2LY7vyRbzhv-s2nnX3U428B5-O8LR13fV7rsGoE6AiLFnjZrQGEA2t4pQuXJNA49zuWvI5n-MPVTPsaGcH0hjImDgdLYG-MmTZAf5ryQXoQOq0Ad8ZnadQjASyLTzuseJgFTq5JQLRuMQFLwHUVeXY4K90nsAGqiuOdYg0uG5tL1BjrzoQxS"
                alt="Student learning online"
                width={600}
                height={450}
                className="w-full h-full object-cover rounded-[28px]"
                unoptimized
              />
            </div>

            {/* Badge 1: Top Right - Expert Mentors */}
            <div className="absolute -top-6 -right-4 lg:-right-16 bg-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-4 z-20 border border-gray-100">
              <div className="flex -space-x-3">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvHWci-pJ87RuuSBZd9UgOajzuCCKYv6vE6LLZs06nzdiYmHvmwWgLrfEemDhi5yAtb6FNAjXeTlM-6yOqVk1Nm5e-0T0MS7lq-uv1aladtuCWWZ1_SqnPB7aMfon_6rgme6APz04XYBpVEbcwABOnsaaD_gFd7UmgOrio2UPzZluOXnOkHAy0DJBMW9gQ6yhKbmryfkQNJJOGsY_kY0G0SmMEX7buYNGer4Val-BfgGKXZg5-_d5Q1cyawUUtR2i8CzSneqYsn6dc"
                  alt="Mentor"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  unoptimized
                />
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB03ZO365ZidrlAS6H7DbYhxQ-RJDC-fWdJOjUf1ZElDFWXH-r3RVesthMgiMYLv4sov5rq1ajfdZdvFarAI2SULnzzmlx66UmU3QlDwXrchuznZVgDwLEMywQkq9gpU41LAxWaVD2fYb08EGqlsi6kKBYsImkZN_aYi5O9Jf7IPsmBJ1X_84hxf6VwKiJttbvAk421Qpm4gd3tdACNnjggij3SXkN3kG0-9x1RIH8-fr3_e_BxuaxPLXarHu-LQwePptkSVNHSfhqg"
                  alt="Mentor"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  300+
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Expert Mentors
                </span>
              </div>
            </div>

            {/* Badge 2: Bottom Left - Total Students */}
            <div className="absolute -bottom-8 -left-4 lg:-left-12 bg-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-4 z-20 border border-gray-100">
              <div className="flex -space-x-3">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe7ClxcFQIYVIDW3wbEeDfSehh0WL8dIM07mlegR5R_F12A2Chmxlze1oubcaNXYwjpwciqoRsfwtAbjLW8TvZc0pRsZ6MHHpC2_OLxJ39xOEbuGhHTMEyeTHAgzil6l2Y9Iiky8o962ECMewcvQ8pXAGUkh-bH6jaooCIL4CGs_IcDa5DOSvf-ngq_7l98OQn87f97BkJoLOTbfiOcQDTW21V8vMx8R9vlMnJwG33Lul3UckoL3FxPhlp_LAGA74gcAGMltbnoLhG"
                  alt="Student"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  unoptimized
                />
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCawnN2tgqqnt0GKu_KnWbt_L6V7yCl4_t891jxzBoNElc2Xb2eqbE4iuMxi967ARZWzJPlp0JS1daHzGknIBjSUXjcXpi18lXVKUr1TQpbIMCrXySiUieucuoCO92UScdLsQJtzCyTql_kaWjm1s4iUNmnD986-oR7_TAI-DIXKmo1uozeAFo7uGCwSkZ0B0D-EW56sbvE7r6E4Bbh42bprgkyAGCh67Xw93vckdcJZOEljSrZp1goTsvqijg5-rdMsF88B6Mm17ST"
                  alt="Student"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  unoptimized
                />
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvHWci-pJ87RuuSBZd9UgOajzuCCKYv6vE6LLZs06nzdiYmHvmwWgLrfEemDhi5yAtb6FNAjXeTlM-6yOqVk1Nm5e-0T0MS7lq-uv1aladtuCWWZ1_SqnPB7aMfon_6rgme6APz04XYBpVEbcwABOnsaaD_gFd7UmgOrio2UPzZluOXnOkHAy0DJBMW9gQ6yhKbmryfkQNJJOGsY_kY0G0SmMEX7buYNGer4Val-BfgGKXZg5-_d5Q1cyawUUtR2i8CzSneqYsn6dc"
                  alt="Student"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  50K+
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Total Students
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slanted Ribbons */}
      {/* Underlying purple ribbon */}
      <div className="absolute bottom-6 left-[-5%] w-[110%] h-24 bg-indigo-900 -rotate-2 z-30" />

      {/* Top dark ribbon with marquee */}
      <div className="absolute bottom-10 left-[-5%] w-[110%] h-20 bg-[#1e2029] -rotate-3 z-40 flex items-center overflow-hidden border-y border-gray-700 shadow-xl">
        <div className="animate-marquee flex items-center text-white text-2xl font-bold tracking-wide whitespace-nowrap py-4">
          <span className="mx-8">Discover</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Design</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Develop</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Discover</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Design</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Develop</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Discover</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Design</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Develop</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Discover</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Design</span>
          <span className="text-white/50 text-xl">✦</span>
          <span className="mx-8">Develop</span>
          <span className="text-white/50 text-xl">✦</span>
        </div>
      </div>
    </section>
  );
}
