import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Settings,
  LogOut,
  User,
  BookOpen,
  Target,
} from "lucide-react";
import SignOutBtn from "./SignOutBtn";

export const dynamic = "force-dynamic";

const UserInfo = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  let profile: any = null;
  try {
    profile = await (db as any).userProfile.findUnique({
      where: { clerkId: userId },
    });
  } catch (e) {}

  if (!profile) {
    return (
      <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-sm p-8 text-center">
        <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 mb-4">Complete your profile to get started</p>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-[#2F288B] hover:bg-[#3E399A] transition"
        >
          <Settings className="w-4 h-4" />
          Set Up Profile
        </Link>
      </div>
    );
  }

  const displayName =
    profile.displayName ||
    `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
    "User";

  const location = [profile.city, profile.country].filter(Boolean).join(", ");

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="h-32 bg-gradient-to-r from-[#170777] via-[#2F288B] to-[#5652b3] relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-60 h-60 bg-[#C3C0FF]/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 pb-6">
        {/* Avatar & Actions */}
        <div className="-mt-16 mb-4 flex items-end justify-between">
          <div className="relative">
            <div className="w-[120px] h-[120px] rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-[#E3DFFF]">
              {profile.profileImage ? (
                <Image
                  alt={displayName}
                  src={profile.profileImage}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#2F288B]">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-[#2F288B] hover:bg-[#3E399A] transition shadow-sm"
            >
              <Settings className="w-4 h-4" />
              Edit Profile
            </Link>
            <SignOutBtn />
          </div>
        </div>

        {/* Name & Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
            {profile.experienceLevel && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E3DFFF] text-[#2F288B]">
                {profile.experienceLevel}
              </span>
            )}
          </div>
          {profile.headline && (
            <p className="text-sm text-gray-500 mt-1">{profile.headline}</p>
          )}
          <p className="text-gray-500 mt-1.5 flex items-center gap-1.5 text-sm">
            <Mail className="w-4 h-4" />
            {profile.email}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard
            icon={<Calendar className="w-5 h-5 text-[#2F288B]" />}
            label="Member Since"
            value={memberSince}
          />
          {location && (
            <InfoCard
              icon={<MapPin className="w-5 h-5 text-[#5652b3]" />}
              label="Location"
              value={location}
            />
          )}
          <InfoCard
            icon={<Phone className="w-5 h-5 text-green-500" />}
            label="Phone"
            value={profile.phone || "Not added"}
          />
          {(profile.occupation || profile.company) && (
            <InfoCard
              icon={<Briefcase className="w-5 h-5 text-amber-500" />}
              label="Occupation"
              value={
                profile.occupation
                  ? profile.company
                    ? `${profile.occupation} at ${profile.company}`
                    : profile.occupation
                  : profile.company || ""
              }
            />
          )}
          {profile.educationLevel && (
            <InfoCard
              icon={<GraduationCap className="w-5 h-5 text-purple-500" />}
              label="Education"
              value={profile.educationLevel}
            />
          )}
          {profile.learningGoal && (
            <InfoCard
              icon={<Target className="w-5 h-5 text-rose-500" />}
              label="Learning Goal"
              value={profile.learningGoal}
            />
          )}
        </div>

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <div className="border-t border-gray-100 pt-4 mb-4">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-3">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#E3DFFF] text-[#2F288B]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition"
            >
              <User className="w-4 h-4" />
              Account Settings
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition"
            >
              <BookOpen className="w-4 h-4" />
              Browse Courses
            </Link>
            <Link
              href="/teacher/courses"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition"
            >
              <Settings className="w-4 h-4" />
              Teacher Mode
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
      <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
}

export default UserInfo;
