"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

const SignOutBtn = () => {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut({ redirectUrl: "/" })}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  );
};

export default SignOutBtn;
