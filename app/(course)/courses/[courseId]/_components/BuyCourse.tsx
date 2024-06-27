"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Purchase } from "@prisma/client";

interface BuyCourseProps {
  price: number;
  courseId: string;
  userId: string;
  purchase: Purchase[];
}

const BuyCourse = ({ price, courseId, purchase, userId }: BuyCourseProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const UpdatePurchase = async () => {
    try {
      await axios.post(`/api/courses/${courseId}/purchase`, {
        userId,
        courseId,
      });
      toast.success("Purchase successful!");
      router.refresh();
    } catch (e) {
      toast.error("Something Went Wrong!");
    }
  };

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
      UpdatePurchase();
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
