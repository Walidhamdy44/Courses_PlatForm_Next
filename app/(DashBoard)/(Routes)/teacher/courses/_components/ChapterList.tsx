"use client";

import { Chapter } from "@prisma/client";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface chapterListProps {
  items: Chapter[];
  courseId: string;
}
const ChapterList = ({ items, courseId }: chapterListProps) => {
  const router = useRouter();

  const onDelet = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapter/${id}`);
      toast.success("Course deleted Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapter/${id}`);
  };

  return (
    <div className="flex items-start gap-3 flex-col">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-2 border px-2 py-[15px] w-full rounded-md text-green-500 border-green-300 bg-green-100"
        >
          <p className="text-[16px] ">{item.chapterTitle}</p>
          <div className="flex items-center gap-2">
            <Edit
              color="green"
              className="cursor-pointer"
              onClick={() => {
                onEdit(item.id);
              }}
            />
            <Delete
              color="red"
              className="cursor-pointer"
              onClick={() => {
                onDelet(item.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;
