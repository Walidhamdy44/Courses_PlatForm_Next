"use client";

import { Button } from "@/components/ui/button";
import { Attachment, Purchase } from "@prisma/client";
import { CheckCircle, Download } from "lucide-react";
import toast from "react-hot-toast";
import BuyCourse from "./BuyCourse";

interface CompleteChapterProps {
  title: string;
  desc: string;
  complete: boolean;
  purchase: Purchase[];
  attachments: Attachment[];
  price: number;
  courseId: string;
}

const ChapterCompleteSec = ({
  title,
  desc,
  complete,
  price,
  purchase,
  attachments,
  courseId,
}: CompleteChapterProps) => {
  const CompleteChapter = async () => {
    try {
      // Your logic to mark the chapter as completed
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-4">
      {purchase.length === 0 ? (
        <>
          <div className="flex items-center justify-between gap-4 p-6 shadow-md flex-col md:flex-row">
            <p className="text-gray-500 font-semibold text-[20px]">{title}</p>
            <BuyCourse price={price} courseId={courseId} />
          </div>
          <div className="p-4 flex items-start flex-col gap-4 shadow-inner mt-4">
            <p className="text-[22px] text-teal-600 font-semibold">
              Description
            </p>
            <p className=" text-gray-400">{desc}</p>
          </div>
          <div className="p-4 flex items-start flex-col gap-4 shadow-inner mt-4">
            <p className="text-[22px] text-teal-600 font-semibold">
              Attachments
            </p>
            <p className=" text-gray-400">To Get Attachments You Have to Pay</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-end justify-between gap-4 p-6">
            <p className="text-gray-500 font-semibold">{title}</p>
            <Button
              className="flex items-center gap-3"
              onClick={CompleteChapter}
            >
              <CheckCircle className="h-4 w-4" /> Mark as Completed
            </Button>
          </div>
          <div className="p-4 text-gray-400 flex items-center justify-center">
            {desc}
          </div>
          <div className="p-4 flex items-start flex-col gap-4 shadow-inner mt-4">
            <p className="text-[22px] text-teal-600 font-semibold">
              Attachments
            </p>
            <ul className="list-disc pl-5 space-y-3 w-full">
              {attachments.map((attachment) => (
                <li
                  key={attachment.id}
                  className="flex items-center justify-between gap-2 p-2 bg-gray-100 rounded-md shadow-sm"
                >
                  <span className="text-gray-700 font-medium">
                    {attachment.name}
                  </span>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-4"
                  >
                    <Button className=" flex items-center gap-4">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterCompleteSec;
