import { db } from "@/lib/db";
import HomeNavbar from "./_components-home/HomeNavbar";
import HeroSection from "./_components-home/HeroSection";
import TrustedLogos from "./_components-home/TrustedLogos";
import FeaturesSection from "./_components-home/FeaturesSection";
import TestimonialsSection from "./_components-home/TestimonialsSection";
import PromoBanner from "./_components-home/PromoBanner";
import NewsletterSection from "./_components-home/NewsletterSection";
import HomeFooter from "./_components-home/HomeFooter";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch top 3 courses by student count (purchases)
  let courses: any[] = [];
  try {
    const allCourses = await db.course.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        chapter: { where: { isPublished: true }, select: { id: true } },
        purchase: true,
      },
    });

    // Sort by purchase count and take top 3
    courses = allCourses
      .sort((a, b) => b.purchase.length - a.purchase.length)
      .slice(0, 3);
  } catch (e) {}

  // Fetch top 3 instructors by course count
  let topInstructors: any[] = [];
  try {
    // Get all published courses grouped by userId
    const allCourses = await db.course.findMany({
      where: { isPublished: true },
      select: { userId: true },
    });

    // Count courses per instructor
    const countMap = new Map<string, number>();
    allCourses.forEach((c) => {
      countMap.set(c.userId, (countMap.get(c.userId) || 0) + 1);
    });

    // Sort by count and take top 3
    const topIds = [...countMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, count]) => ({ id, count }));

    if (topIds.length > 0) {
      const profiles = await (db as any).userProfile.findMany({
        where: { clerkId: { in: topIds.map((t) => t.id) } },
        select: {
          clerkId: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImage: true,
          headline: true,
          occupation: true,
        },
      });

      // Merge with counts and maintain order
      topInstructors = topIds.map((t) => {
        const profile = profiles.find((p: any) => p.clerkId === t.id);
        return {
          ...profile,
          courseCount: t.count,
        };
      }).filter((t: any) => t.clerkId);
    }
  } catch (e) {}

  return (
    <main className="bg-[#f9f9f9] min-h-screen text-gray-900">
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection courses={courses} />
      <TestimonialsSection instructors={topInstructors} />
      <TrustedLogos />
      <NewsletterSection />
      <PromoBanner />
      <HomeFooter />
    </main>
  );
}
