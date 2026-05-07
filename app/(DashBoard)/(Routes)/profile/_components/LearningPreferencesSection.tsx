"use client";

import { GraduationCap } from "lucide-react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

const LearningPreferencesSection = ({ formData, updateField }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E3DFFF] flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-[#2F288B]" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Learning Preferences
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Row 1: Learning Goal / Weekly Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Learning Goal
            </label>
            <select
              value={formData.learningGoal}
              onChange={(e) => updateField("learningGoal", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors bg-white"
            >
              <option value="">Select goal</option>
              <option value="Career Switch">Career Switch</option>
              <option value="Upskill">Upskill</option>
              <option value="Hobby">Hobby</option>
              <option value="Academic">Academic</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Weekly Hours Available
            </label>
            <input
              type="number"
              min={0}
              max={80}
              value={formData.weeklyHoursAvailable}
              onChange={(e) =>
                updateField("weeklyHoursAvailable", parseInt(e.target.value) || 0)
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="10"
            />
          </div>
        </div>

        {/* Row 2: Preferred Content Type */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-3">
            Preferred Content Type
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            {[
              { value: "Video Courses", label: "Video Courses" },
              { value: "Reading & Documentation", label: "Reading & Documentation" },
              { value: "Hands-on Projects", label: "Hands-on Projects" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${
                  formData.preferredContentType === option.value
                    ? "border-[#2F288B] bg-[#E3DFFF]/30 text-[#2F288B]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="preferredContentType"
                  value={option.value}
                  checked={formData.preferredContentType === option.value}
                  onChange={(e) =>
                    updateField("preferredContentType", e.target.value)
                  }
                  className="w-4 h-4 text-[#2F288B] focus:ring-[#2F288B]"
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Row 3: Experience Level */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-3">
            Experience Level
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label
                key={level}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${
                  formData.experienceLevel === level
                    ? "border-[#2F288B] bg-[#E3DFFF]/30 text-[#2F288B]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="experienceLevel"
                  value={level}
                  checked={formData.experienceLevel === level}
                  onChange={(e) =>
                    updateField("experienceLevel", e.target.value)
                  }
                  className="w-4 h-4 text-[#2F288B] focus:ring-[#2F288B]"
                />
                <span className="text-sm font-medium">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPreferencesSection;
