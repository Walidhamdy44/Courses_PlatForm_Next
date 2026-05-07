export const dynamic = "force-dynamic";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProfileForm from "./_components/ProfileForm";

const ProfilePage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const user = await currentUser();

  // Get or create profile
  let profile: any = null;
  try {
    profile = await (db as any).userProfile.findUnique({
      where: { clerkId: userId },
    });

    if (!profile) {
      profile = await (db as any).userProfile.create({
        data: {
          clerkId: userId,
          email: user?.emailAddresses[0]?.emailAddress || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          profileImage: user?.imageUrl || "",
          displayName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        },
      });
    }
  } catch (error) {
    // If userProfile model isn't available yet (prisma generate needed), use defaults from Clerk
    profile = {
      clerkId: userId,
      email: user?.emailAddresses[0]?.emailAddress || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profileImage: user?.imageUrl || "",
      displayName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      phone: "",
      dateOfBirth: "",
      gender: "",
      headline: "",
      bio: "",
      country: "",
      city: "",
      timezone: "",
      preferredLanguage: "en",
      occupation: "",
      company: "",
      educationLevel: "",
      interests: [],
      skills: [],
      website: "",
      github: "",
      linkedin: "",
      twitter: "",
      learningGoal: "",
      weeklyHoursAvailable: 0,
      preferredContentType: "",
      experienceLevel: "Beginner",
      emailNotifications: true,
      marketingEmails: false,
      courseUpdateAlerts: true,
    };
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
};

export default ProfilePage;
