"use client";

import { Bell } from "lucide-react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

const NotificationSection = ({ formData, updateField }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E3DFFF] flex items-center justify-center">
          <Bell className="w-4 h-4 text-[#2F288B]" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Notification Settings
        </h2>
      </div>

      {/* Toggle Items */}
      <div className="space-y-4">
        {/* Email Notifications */}
        <div className="flex items-center justify-between py-3 border-b border-gray-50">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Email Notifications
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Receive daily digest and course activity
            </p>
          </div>
          <button
            onClick={() =>
              updateField("emailNotifications", !formData.emailNotifications)
            }
            className={`relative w-11 h-6 rounded-full transition-colors ${
              formData.emailNotifications ? "bg-[#2F288B]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                formData.emailNotifications ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Marketing Emails */}
        <div className="flex items-center justify-between py-3 border-b border-gray-50">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Marketing Emails
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Product tips and feature recommendations
            </p>
          </div>
          <button
            onClick={() =>
              updateField("marketingEmails", !formData.marketingEmails)
            }
            className={`relative w-11 h-6 rounded-full transition-colors ${
              formData.marketingEmails ? "bg-[#2F288B]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                formData.marketingEmails ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Course Updates */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Course Updates</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Get notified when enrolled courses are updated
            </p>
          </div>
          <button
            onClick={() =>
              updateField("courseUpdateAlerts", !formData.courseUpdateAlerts)
            }
            className={`relative w-11 h-6 rounded-full transition-colors ${
              formData.courseUpdateAlerts ? "bg-[#2F288B]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                formData.courseUpdateAlerts ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
