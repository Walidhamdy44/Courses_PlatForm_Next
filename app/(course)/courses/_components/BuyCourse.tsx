"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface BuyCourse {
  price: number;
  courseId: string;
}

const BuyCourse = ({ price, courseId }: BuyCourse) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`, {
        title: "Course Purchase", // Ensure a title is sent in the body
      });
      window.location.assign(res.data.url);
    } catch (e) {
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="flex items-center gap-3"
        disabled={isLoading}
        onClick={onClick}
      >
        <CircleDollarSign className="h-4 w-4" /> Buy Course for {price} $
      </Button>
    </div>
  );
};

export default BuyCourse;
