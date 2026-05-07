"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Briefcase,
  Link2,
  GraduationCap,
  Bell,
  Camera,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import PersonalInfoSection from "./PersonalInfoSection";
import LocationSection from "./LocationSection";
import ProfessionalSection from "./ProfessionalSection";
import SocialLinksSection from "./SocialLinksSection";
import LearningPreferencesSection from "./LearningPreferencesSection";
import NotificationSection from "./NotificationSection";

interface ProfileFormProps {
  profile: any;
}

const ProfileForm = ({ profile }: ProfileFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    displayName: profile.displayName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    dateOfBirth: profile.dateOfBirth || "",
    gender: profile.gender || "",
    headline: profile.headline || "",
    bio: profile.bio || "",
    country: profile.country || "",
    city: profile.city || "",
    timezone: profile.timezone || "",
    preferredLanguage: profile.preferredLanguage || "en",
    occupation: profile.occupation || "",
    company: profile.company || "",
    educationLevel: profile.educationLevel || "",
    interests: profile.interests || [],
    skills: profile.skills || [],
    website: profile.website || "",
    github: profile.github || "",
    linkedin: profile.linkedin || "",
    twitter: profile.twitter || "",
    learningGoal: profile.learningGoal || "",
    weeklyHoursAvailable: profile.weeklyHoursAvailable || 0,
    preferredContentType: profile.preferredContentType || "",
    experienceLevel: profile.experienceLevel || "Beginner",
    emailNotifications: profile.emailNotifications ?? true,
    marketingEmails: profile.marketingEmails ?? false,
    courseUpdateAlerts: profile.courseUpdateAlerts ?? true,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/profile", formData);
      toast.success("Profile saved successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      displayName: profile.displayName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      dateOfBirth: profile.dateOfBirth || "",
      gender: profile.gender || "",
      headline: profile.headline || "",
      bio: profile.bio || "",
      country: profile.country || "",
      city: profile.city || "",
      timezone: profile.timezone || "",
      preferredLanguage: profile.preferredLanguage || "en",
      occupation: profile.occupation || "",
      company: profile.company || "",
      educationLevel: profile.educationLevel || "",
      interests: profile.interests || [],
      skills: profile.skills || [],
      website: profile.website || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      twitter: profile.twitter || "",
      learningGoal: profile.learningGoal || "",
      weeklyHoursAvailable: profile.weeklyHoursAvailable || 0,
      preferredContentType: profile.preferredContentType || "",
      experienceLevel: profile.experienceLevel || "Beginner",
      emailNotifications: profile.emailNotifications ?? true,
      marketingEmails: profile.marketingEmails ?? false,
      courseUpdateAlerts: profile.courseUpdateAlerts ?? true,
    });
    toast.success("Changes discarded.");
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-[#E3DFFF]">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#E3DFFF]">
                  <User className="w-10 h-10 text-[#2F288B]" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Name & Headline */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {formData.displayName || `${formData.firstName} ${formData.lastName}`.trim() || "Your Name"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {formData.headline || "Add a headline to describe yourself"}
            </p>
            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E3DFFF] text-[#2F288B]">
                Learner
              </span>
              {formData.city && formData.country && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {formData.city}, {formData.country}
                </span>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#2F288B] hover:bg-[#3E399A] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : null}
            Save Changes
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <PersonalInfoSection formData={formData} updateField={updateField} />

      {/* Location & Language */}
      <LocationSection formData={formData} updateField={updateField} />

      {/* Professional & Education */}
      <ProfessionalSection formData={formData} updateField={updateField} />

      {/* Social Links */}
      <SocialLinksSection formData={formData} updateField={updateField} />

      {/* Learning Preferences */}
      <LearningPreferencesSection formData={formData} updateField={updateField} />

      {/* Notification Settings */}
      <NotificationSection formData={formData} updateField={updateField} />

      {/* Footer Buttons */}
      <div className="flex items-center justify-center gap-4 pt-4 pb-8">
        <button
          onClick={handleDiscard}
          className="px-6 py-2.5 rounded-xl font-medium text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Discard Changes
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-[#2F288B] hover:bg-[#3E399A] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
