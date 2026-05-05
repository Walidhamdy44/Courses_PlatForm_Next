"use client";

import { UserProfile } from "@clerk/nextjs";
import { X } from "lucide-react";
import { useState } from "react";

interface UserProfileModalProps {
  children: React.ReactNode;
}

const UserProfileModal = ({ children }: UserProfileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-[880px] max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <UserProfile
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none w-full",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileModal;
