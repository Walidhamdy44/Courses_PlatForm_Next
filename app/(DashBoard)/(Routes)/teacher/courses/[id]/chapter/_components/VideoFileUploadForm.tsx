"use client";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";

import toast from "react-hot-toast";
import { Upload, Video, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import FileUpload from "@/components/FileUpload";

interface viedoFile {
  initialData: Chapter & { muxData?: MuxData | null };

  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ViedoFileUploadForm = ({
  courseId,
  initialData,
  chapterId,
}: viedoFile) => {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}`,
        values
      );
      toast.success("Chapter Updated Successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-slate-100 p-[15px]  rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-[19px]">Chapter Video</span>
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
          {initialData.videoUrl ? (
            <div className="flex items-center justify-center bg-slate-200 p-3 mt-3 aspect-video relative">
              <video
                controls
                controlsList="nodownload"
                style={{
                  accentColor: "#0cea22",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              >
                <source src={initialData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* <MuxPlayer
                playbackId={initialData.muxData.playbackId || ""}
                accentColor="#0cea22"
              /> */}
            </div>
          ) : (
            <div
              className="flex items-center  cursor-pointer justify-center bg-slate-200 p-3 h-60"
              onClick={() => {
                setAllowed(true);
              }}
            >
              <Video width={50} height={50} />
            </div>
          )}
        </div>
      ) : null}
      {allowed ? (
        <div className="flex items-center justify-center flex-col p-4">
          <FileUpload
            endPoint="ChapterVideo"
            onChange={(url) => {
              if (url) onSubmit({ videoUrl: url });
            }}
          />
          <div className="text-sm  text-muted-foreground mt-[20px]">
            Video may takes a long time to process Please Wait ..
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ViedoFileUploadForm;
