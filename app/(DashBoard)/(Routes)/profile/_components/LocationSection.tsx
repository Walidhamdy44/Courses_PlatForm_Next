"use client";

import { MapPin } from "lucide-react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

const LocationSection = ({ formData, updateField }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E3DFFF] flex items-center justify-center">
          <MapPin className="w-4 h-4 text-[#2F288B]" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Location & Language
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Row 1: Country / City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors bg-white"
            >
              <option value="">Select country</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Egypt">Egypt</option>
              <option value="India">India</option>
              <option value="Brazil">Brazil</option>
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="UAE">UAE</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              placeholder="San Francisco"
            />
          </div>
        </div>

        {/* Row 2: Timezone / Preferred Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Timezone
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => updateField("timezone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors bg-white"
            >
              <option value="">Select timezone</option>
              <option value="GMT-08:00 Pacific Time">GMT-08:00 Pacific Time</option>
              <option value="GMT-07:00 Mountain Time">GMT-07:00 Mountain Time</option>
              <option value="GMT-06:00 Central Time">GMT-06:00 Central Time</option>
              <option value="GMT-05:00 Eastern Time">GMT-05:00 Eastern Time</option>
              <option value="GMT+00:00 London">GMT+00:00 London</option>
              <option value="GMT+01:00 Paris">GMT+01:00 Paris</option>
              <option value="GMT+02:00 Cairo">GMT+02:00 Cairo</option>
              <option value="GMT+03:00 Riyadh">GMT+03:00 Riyadh</option>
              <option value="GMT+04:00 Dubai">GMT+04:00 Dubai</option>
              <option value="GMT+05:30 Mumbai">GMT+05:30 Mumbai</option>
              <option value="GMT+08:00 Singapore">GMT+08:00 Singapore</option>
              <option value="GMT+09:00 Tokyo">GMT+09:00 Tokyo</option>
              <option value="GMT+10:00 Sydney">GMT+10:00 Sydney</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Preferred Language
            </label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => updateField("preferredLanguage", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors bg-white"
            >
              <option value="en">English (US)</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
              <option value="pt">Portuguese</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
