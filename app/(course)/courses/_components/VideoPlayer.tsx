"use client";
import { Lock } from "lucide-react";
import ReactPlayer from "react-player";

interface chapterVideo {
  vidUrl: string;
  isFree: Boolean;
}

const VideoPlayer = ({ vidUrl, isFree }: chapterVideo) => {
  const urlWithParams = `${vidUrl}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

  return (
    <div className="p-6">
      {isFree ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gray-900">
          <ReactPlayer
            url={urlWithParams}
            className="absolute top-0 left-0 w-full h-full"
            controls
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div className="aspect-video overflow-hidden rounded-lg shadow-lg bg-gray-900 flex items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-5 text-white">
            <Lock className="w-8 h-8" />
            <p className="sm:text-[15px] md:text-[19px]">
              This Chapter Is Locked Puerchase To Open
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
