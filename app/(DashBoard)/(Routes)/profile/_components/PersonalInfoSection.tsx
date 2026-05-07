"use client";

import { User } from "lucide-react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

const PersonalInfoSection = ({ formData, updateField }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E3DFFF] flex items-center justify-center">
          <User className="w-4 h-4 text-[#2F288B]" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="Alex"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="Rivera"
            />
          </div>
        </div>

        {/* Row 2: Display Name / Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => updateField("displayName", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="Alex Rivera"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Email (Read-only)
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Row 3: Phone / Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
            />
          </div>
        </div>

        {/* Row 4: Gender */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => updateField("gender", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors bg-white"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* Row 5: Headline */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Headline
          </label>
          <input
            type="text"
            value={formData.headline}
            onChange={(e) => updateField("headline", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
            placeholder="Senior UX Designer & Continuous Learner"
          />
        </div>

        {/* Row 6: Bio */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={4}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors resize-none"
            placeholder="Tell us about yourself, your experience, and what drives you to learn..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
