import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  Settings,
  LogOut,
  User,
  ExternalLink,
} from "lucide-react";
import UserProfileModal from "./UserProfileModal";

export const dynamic = "force-dynamic";

const UserInfo = async () => {
  const user = await currentUser();

  if (!user) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Profile Section */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-16 mb-4 flex items-end justify-between">
          <div className="relative">
            <Image
              alt={user.fullName || "User"}
              src={user.imageUrl}
              width={120}
              height={120}
              className="rounded-2xl border-4 border-white shadow-lg object-cover"
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <UserProfileModal>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm">
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
            </UserProfileModal>

            <SignOutButton>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* Name & Email */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.fullName || "User"}
          </h2>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard
            icon={<Calendar className="w-5 h-5 text-indigo-500" />}
            label="Member Since"
            value={formatDate(user.createdAt)}
          />
          <InfoCard
            icon={<Clock className="w-5 h-5 text-purple-500" />}
            label="Last Active"
            value={
              user.lastActiveAt
                ? `${formatDate(user.lastActiveAt)} at ${formatTime(user.lastActiveAt)}`
                : "Just now"
            }
          />
          <InfoCard
            icon={<Phone className="w-5 h-5 text-green-500" />}
            label="Phone"
            value={
              user.phoneNumbers && user.phoneNumbers.length > 0
                ? user.phoneNumbers[0].phoneNumber
                : "Not added"
            }
          />
          <InfoCard
            icon={<Shield className="w-5 h-5 text-amber-500" />}
            label="Account Status"
            value="Verified"
            badge
          />
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-2">
            <UserProfileModal>
              <ActionButton
                icon={<User className="w-4 h-4" />}
                label="Account Settings"
              />
            </UserProfileModal>
            <UserProfileModal>
              <ActionButton
                icon={<Shield className="w-4 h-4" />}
                label="Security"
              />
            </UserProfileModal>
            <UserProfileModal>
              <ActionButton
                icon={<ExternalLink className="w-4 h-4" />}
                label="Connected Accounts"
              />
            </UserProfileModal>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="mt-4 text-xs text-gray-400 text-center">
          🔒 This information is only visible to you
        </p>
      </div>
    </div>
  );
};

function InfoCard({
  icon,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
      <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          {value}
          {badge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700">
              ✓
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition cursor-pointer">
      {icon}
      {label}
    </button>
  );
}

export default UserInfo;
