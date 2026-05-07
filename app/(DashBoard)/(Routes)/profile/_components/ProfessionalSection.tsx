"use client";

import { Briefcase, X, Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

const ProfessionalSection = ({ formData, updateField }: Props) => {
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const addInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      updateField("interests", [...formData.interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    updateField(
      "interests",
      formData.interests.filter((i: string) => i !== interest)
    );
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      updateField("skills", [...formData.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    updateField(
      "skills",
      formData.skills.filter((s: string) => s !== skill)
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E3DFFF] flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-[#2F288B]" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Professional & Education
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Row 1: Occupation / Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Occupation
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => updateField("occupation", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="Senior UX Designer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="Design Systems Inc."
            />
          </div>
        </div>

        {/* Row 2: Education Level */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Education Level
          </label>
          <select
            value={formData.educationLevel}
            onChange={(e) => updateField("educationLevel", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors bg-white"
          >
            <option value="">Select education level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor&apos;s</option>
            <option value="Master's">Master&apos;s</option>
            <option value="PhD">PhD</option>
            <option value="Self-taught">Self-taught</option>
          </select>
        </div>

        {/* Row 3: Interests */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Interests
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.interests.map((interest: string) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#E3DFFF] text-[#2F288B]"
              >
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="Add interest (e.g. Web Dev, AI, UX/UI)"
            />
            <button
              onClick={addInterest}
              className="px-3 py-2.5 rounded-lg bg-[#E3DFFF] text-[#2F288B] hover:bg-[#d4d0f7] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 4: Skills */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill: string) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="Add skill (e.g. React, Figma, Design Systems)"
            />
            <button
              onClick={addSkill}
              className="px-3 py-2.5 rounded-lg bg-[#E3DFFF] text-[#2F288B] hover:bg-[#d4d0f7] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSection;
