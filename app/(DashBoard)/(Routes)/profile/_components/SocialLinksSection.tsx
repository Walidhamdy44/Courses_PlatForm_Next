"use client";

import { Link2, Globe, Github, Linkedin, Twitter } from "lucide-react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

const SocialLinksSection = ({ formData, updateField }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E3DFFF] flex items-center justify-center">
          <Link2 className="w-4 h-4 text-[#2F288B]" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Row 1: Website / GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
                placeholder="https://alexrivera.design"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              GitHub
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={formData.github}
                onChange={(e) => updateField("github", e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
                placeholder="https://github.com/alexrivera"
              />
            </div>
          </div>
        </div>

        {/* Row 2: LinkedIn / Twitter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              LinkedIn
            </label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
                placeholder="https://linkedin.com/in/alexrivera"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Twitter / X
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => updateField("twitter", e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
                placeholder="https://x.com/alex_design"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSection;
