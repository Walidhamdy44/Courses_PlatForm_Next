import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-24 px-6 max-w-[1280px] mx-auto">
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-[32px] py-20 px-10 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">
          Ready To Grow? Sign Up For
          <br />
          our Training Programs!
        </h2>
        <p className="text-white/80 mb-10 max-w-2xl mx-auto">
          Empowering students with expert education, expert guidance, and
          interactive learning experiences.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-white text-indigo-900 px-10 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
}
