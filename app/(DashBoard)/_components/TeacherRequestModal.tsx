"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { X, GraduationCap, Loader2, Clock, CheckCircle2 } from "lucide-react";

interface Props {
  teacherStatus: string;
}

const TeacherRequestModal = ({ teacherStatus }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [motivation, setMotivation] = useState("");

  // Don't show button if already approved
  if (teacherStatus === "approved") return null;

  const handleSubmit = async () => {
    if (!expertise.trim() || !experience.trim() || !motivation.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("/api/teacher-request", {
        expertise: expertise.trim(),
        experience: experience.trim(),
        motivation: motivation.trim(),
      });
      toast.success("Request submitted! We'll review it shortly.");
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      const msg = error?.response?.data || "Something went wrong";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {teacherStatus === "pending" ? (
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-amber-50 text-amber-700 border border-amber-200 cursor-default"
        >
          <Clock className="w-4 h-4" />
          Request Pending
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#E3DFFF] text-[#2F288B] hover:bg-[#d4d0f7] transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          Become a Teacher
        </button>
      )}

      {/* Modal */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#170777] to-[#5652b3] p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <GraduationCap className="w-10 h-10 text-white/80 mb-3" />
              <h2 className="text-xl font-bold text-white">
                Become a Teacher
              </h2>
              <p className="text-white/70 text-sm mt-1">
                Share your knowledge and inspire learners worldwide
              </p>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Subject Expertise *
                </label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  placeholder="e.g. Web Development, UI/UX Design, Data Science"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Years of Experience *
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 5 years in frontend development"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Why do you want to teach? *
                </label>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  rows={3}
                  placeholder="Tell us why you'd like to become an instructor..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2F288B] text-white rounded-lg text-sm font-semibold hover:bg-[#3E399A] transition-colors disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                Submit Request
              </button>

              <p className="text-xs text-gray-400 text-center">
                Your request will be reviewed by our team. You&apos;ll be notified once approved.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default TeacherRequestModal;
