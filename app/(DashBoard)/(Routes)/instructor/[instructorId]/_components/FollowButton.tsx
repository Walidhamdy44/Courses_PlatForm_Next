"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";

interface FollowButtonProps {
  instructorId: string;
  isFollowing: boolean;
  followerCount: number;
}

const FollowButton = ({
  instructorId,
  isFollowing: initialIsFollowing,
  followerCount: initialCount,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followerCount, setFollowerCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);

      if (isFollowing) {
        await axios.delete("/api/follow", {
          data: { followingId: instructorId },
        });
        setIsFollowing(false);
        setFollowerCount((prev) => Math.max(0, prev - 1));
        toast.success("Unfollowed successfully");
      } else {
        await axios.post("/api/follow", {
          followingId: instructorId,
        });
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
        toast.success("Following!");
      }
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setIsFollowing(true);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-60 ${
        isFollowing
          ? "bg-[#E3DFFF] text-[#2F288B] hover:bg-red-50 hover:text-red-600 border border-[#c8c4d4]"
          : "bg-[#2F288B] text-white hover:bg-[#3E399A] shadow-md hover:shadow-lg"
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isFollowing ? (
        <UserCheck className="w-4 h-4" />
      ) : (
        <UserPlus className="w-4 h-4" />
      )}
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
