import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-20 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-16">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-900"
          >
            Learn
          </Link>
          <p className="text-gray-500 text-sm">
            Empowering learners worldwide through rigorous, expert-led digital
            education.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">Quick Link</h5>
          <Link
            href="/"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            Service
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            Pricing
          </Link>
        </div>

        {/* Legal Pages */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">Legal Pages</h5>
          <Link
            href="#"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            Style Guide
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            Changelog
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            Licenses
          </Link>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">Customer Support</h5>
          <a
            href="mailto:support@learn.com"
            className="text-gray-500 hover:text-indigo-900 transition-colors text-sm"
          >
            support@learn.com
          </a>
          <p className="text-gray-500 text-sm">Phone: +0000000000</p>
          <p className="text-gray-500 text-sm">2248-C, Middleton, Hall-23</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-4">
        <p className="text-gray-500 text-xs">
          © copyright 2024 - Design Stand By Figma All right reserved
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
          <span>🌐 English</span>
        </div>
      </div>
    </footer>
  );
}
