"use client";

import { Badge } from "@/components/ui/badge";
import { Chapter } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface chapterListProps {
  items: Chapter[];
  courseId: string;
}
const ChapterList = ({ items, courseId }: chapterListProps) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

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
          {item.ifFree ? <Badge variant="destructive">Free</Badge> : null}

          <div className="flex items-center gap-2">
            {item.isPublished ? (
              <Badge>Published</Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-200">
                Draft
              </Badge>
            )}
            <Pencil
              color="green"
              className="cursor-pointer"
              onClick={() => {
                onEdit(item.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;
