"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface EnrollButtonProps {
  courseId: string;
  price: number;
  isPurchased: boolean;
  firstChapterId?: string;
}

const EnrollButton = ({
  courseId,
  price,
  isPurchased,
  firstChapterId,
}: EnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    if (isPurchased && firstChapterId) {
      router.push(`/courses/${courseId}/chapter/${firstChapterId}`);
      return;
    }

    try {
      setIsLoading(true);

      if (price === 0) {
        // Free course - create purchase directly
        await axios.post(`/api/courses/${courseId}/purchase`);
        toast.success("Enrolled successfully!");
        router.push(`/courses/${courseId}/chapter/${firstChapterId}`);
      } else {
        // Paid course - redirect to checkout
        const res = await axios.post(`/api/courses/${courseId}/checkout`, {
          title: "Course Purchase",
        });
        window.location.assign(res.data.url);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={isLoading}
      className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
        isPurchased
          ? "bg-[#2F288B] text-white hover:bg-[#3E399A] shadow-md hover:shadow-lg"
          : "bg-[#2F288B] text-white hover:bg-[#3E399A] shadow-md hover:shadow-lg"
      } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isPurchased ? (
        "Continue Learning"
      ) : price === 0 ? (
        "Enroll for Free"
      ) : (
        `Enroll Now - $${price.toFixed(2)}`
      )}
    </button>
  );
};

export default EnrollButton;
