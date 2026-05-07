"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircleDollarSign, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Purchase } from "@prisma/client";

interface BuyCourseProps {
  price: number;
  courseId: string;
  purchase: Purchase | null;
}

const BuyCourse = ({ price, courseId, purchase }: BuyCourseProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`, {
        title: "Course Purchase",
      });
      window.location.assign(res.data.url);
    } catch (e) {
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="bg-[#2F288B] hover:bg-[#3E399A] text-white rounded-xl px-6 py-2.5 flex items-center gap-2 shadow-md"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <CircleDollarSign className="h-4 w-4" />
          Enroll for ${price}
        </>
      )}
    </Button>
  );
};

export default BuyCourse;
