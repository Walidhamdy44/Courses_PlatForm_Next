import Link from "next/link";
import React from "react";
import {
  BarChart2,
  Code,
  Brush,
  Stethoscope,
  Gavel,
  CloudHail,
} from "lucide-react";

const HomeSection2 = () => {
  return (
    <div>
      <section>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Find your career path
              </h2>

              <p className="mt-4 text-gray-600">
                Are you looking to explore new career opportunities and find
                your true calling? Do you seek clarity and guidance in your
                professional journey? We understand the importance of choosing
                the right career path that aligns with your passions and goals.
                Our platform offers valuable resources and support to help you
                navigate through various career options. Whether you are a
                recent graduate, a seasoned professional, or someone considering
                a career change
              </p>

              <Link
                href="/dashboard"
                className="mt-8 inline-block rounded bg-green-700 px-12 py-3 text-sm font-medium text-white transition hover:bg-green-500 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <BarChart2 className="h-6 w-6" />
                </span>

                <h2 className="mt-2 font-bold">Accountant</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Manage financial records, ensure accuracy, and help businesses
                  run smoothly.
                </p>
              </a>

              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <Code className="h-6 w-6" />
                </span>

                <h2 className="mt-2 font-bold">Software Developer</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Design and build software applications that power modern
                  technology.
                </p>
              </a>

              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <Brush className="h-6 w-6" />
                </span>

                <h2 className="mt-2 font-bold">Graphic Designer</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Create visual concepts to communicate ideas that inspire,
                  inform, and captivate consumers.
                </p>
              </a>

              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <Stethoscope className="h-6 w-6" />
                </span>

                <h2 className="mt-2 font-bold">Doctor</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Diagnose and treat illnesses, improve patient health, and
                  contribute to medical advancements.
                </p>
              </a>

              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <Gavel className="h-6 w-6" />
                </span>

                <h2 className="mt-2 font-bold">Lawyer</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Advocate for clients, interpret laws, and represent cases in
                  court.
                </p>
              </a>

              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <CloudHail className="h-6 w-6" />
                </span>

                <h2 className="mt-2 font-bold">Teacher</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Educate and inspire students, shaping the future through
                  knowledge and skills.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSection2;
