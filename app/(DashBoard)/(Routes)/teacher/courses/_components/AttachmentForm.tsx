"use client";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import FileUpload from "@/components/FileUpload";
import { Delete, File, Loader2, Upload, X } from "lucide-react";

interface AttachmentForm {
  initialData: Course & { attachment: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ courseId, initialData }: AttachmentForm) => {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  const [deletedId, setDeletdId] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachment`, values);
      toast.success("Course Attachment Updated Successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletdId(id);
      await axios.delete(`/api/courses/${courseId}/attachment/${id}`);
      toast.success("Attachment Deleted Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeletdId(null);
    }
  };

  return (
    <div className="bg-slate-100 p-[15px]  rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-[19px]">Course Attachment</span>
        {allowed ? (
          <Badge
            className="cursor-pointer"
            onClick={() => {
              setAllowed(!allowed);
            }}
          >
            <X />
          </Badge>
        ) : (
          <Badge
            className="cursor-pointer"
            onClick={() => {
              setAllowed(!allowed);
            }}
          >
            <Upload />
          </Badge>
        )}
      </div>
      {!allowed ? (
        <div className="pt-[5px] text-[16px] text-gray-700">
          {initialData.attachment.length === 0 ? (
            <div className="flex items-center justify-center p-3 mt-3  relative">
              <p className="flex items-center justify-center p-[20px]">
                No Attachments yet
              </p>
            </div>
          ) : (
            <div className="mt-[20px] flex flex-col gap-3">
              {initialData.attachment.map((attachment) => (
                <div key={attachment.id} className="flex items-center">
                  <div className="flex items-center gap-2 border px-2 py-[15px] w-full rounded-md text-green-500 border-green-300 bg-green-100">
                    <File color="green" />
                    <p className="text-[16px] line-clamp-1">
                      {attachment.name}
                    </p>
                    {deletedId === attachment.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Badge
                        className="cursor-pointer"
                        onClick={() => {
                          onDelete(attachment.id);
                        }}
                      >
                        <Delete className="cursor-pointer w-4 h-4" />
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
      {allowed ? (
        <div className="flex items-center justify-center flex-col p-4">
          <FileUpload
            endPoint="courseAttachments"
            onChange={(url) => {
              if (url) onSubmit({ url });
            }}
          />
          <div className="text-sm  text-muted-foreground mt-[20px]">
            Add any Files maight halp your students to complete the coures
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AttachmentForm;
