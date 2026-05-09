"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-md border-b border-gray-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 max-w-[1280px] mx-auto h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-900"
          >
            Learn
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-12">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "hero")}
            className="text-gray-600 text-sm font-semibold hover:text-indigo-900 transition-colors duration-200 cursor-pointer"
          >
            Home
          </a>
          <a
            href="#courses"
            onClick={(e) => scrollToSection(e, "courses")}
            className="text-gray-600 text-sm font-semibold hover:text-indigo-900 transition-colors duration-200 cursor-pointer"
          >
            Our Courses
          </a>
          <a
            href="#mentors"
            onClick={(e) => scrollToSection(e, "mentors")}
            className="text-gray-600 text-sm font-semibold hover:text-indigo-900 transition-colors duration-200 cursor-pointer"
          >
            Mentors
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="text-gray-600 text-sm font-semibold hover:text-indigo-900 transition-colors duration-200 cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="#blog"
            onClick={(e) => scrollToSection(e, "blog")}
            className="text-gray-600 text-sm font-semibold hover:text-indigo-900 transition-colors duration-200 cursor-pointer"
          >
            Blog
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isLoaded && isSignedIn ? (
            <Link
              href="/dashboard"
              className="bg-indigo-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-gray-600 text-sm font-semibold hover:text-indigo-900 px-3 py-2 rounded-lg transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-indigo-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
