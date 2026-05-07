"use client";

import { Button } from "@/components/ui/button";
import { Attachment, Purchase } from "@prisma/client";
import {
  CheckCircle2,
  Download,
  FileText,
  CircleDollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CompleteChapterProps {
  title: string;
  desc: string;
  complete: boolean;
  purchase: Purchase | null;
  attachments: Attachment[];
  price: number;
  courseId: string;
  userId: string;
  chapterId: string;
}

const ChapterCompleteSec = ({
  title,
  desc,
  complete,
  price,
  purchase,
  attachments,
  courseId,
  userId,
  chapterId,
}: CompleteChapterProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const CompleteChapter = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}/progress`,
        {
          isCompleted: !complete,
        }
      );
      toast.success("Progress updated!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = async () => {
    try {
      setIsBuying(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`, {
        title: "Course Purchase",
      });
      window.location.assign(res.data.url);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="space-y-6">
      {purchase === null ? (
        <>
          {/* Locked State */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Purchase this course to access all content
              </p>
            </div>
            <Button
              onClick={handleBuy}
              disabled={isBuying}
              className="bg-[#2F288B] hover:bg-[#3E399A] text-white rounded-xl px-6 py-2.5 flex items-center gap-2 shadow-md"
            >
              <CircleDollarSign className="w-4 h-4" />
              Enroll for ${price}
            </Button>
          </div>

          {/* Description */}
          {desc && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {desc}
              </p>
            </div>
          )}

          {/* Attachments locked */}
          {attachments.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Attachments
              </h3>
              <p className="text-sm text-gray-400">
                Purchase the course to access attachments
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Purchased State */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            </div>
            <Button
              onClick={CompleteChapter}
              disabled={isLoading}
              className={`rounded-xl px-5 py-2.5 flex items-center gap-2 transition-all ${
                complete
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-[#2F288B] hover:bg-[#3E399A] text-white"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {complete ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          {/* Description */}
          {desc && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {desc}
              </p>
            </div>
          )}

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                Attachments
              </h3>
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between gap-3 p-3 bg-[#f9f9f9] rounded-xl hover:bg-[#f3f3f3] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#E3DFFF] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-[#2F288B]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {attachment.name}
                      </span>
                    </div>
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#2F288B] hover:underline flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChapterCompleteSec;
