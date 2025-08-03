"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const BtnsHome = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <>
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-2xl border-green-700 border-2 hover:bg-green-400 hover:text-white transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Dashboard
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/sign-up">
            <Button 
              variant="outline" 
              className="rounded-2xl border-green-700 border-2 hover:bg-green-400 hover:text-white transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Sign Up
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button 
              className="rounded-2xl bg-green-600 hover:bg-green-700 text-white transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BtnsHome;
