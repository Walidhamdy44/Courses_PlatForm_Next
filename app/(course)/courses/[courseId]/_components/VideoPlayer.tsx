"use client";
import { Lock } from "lucide-react";
import ReactPlayer from "react-player";
import { Purchase } from "@prisma/client";

interface chapterVideo {
  vidUrl: string;
  isFree: Boolean;
  purchase: Purchase[];
}

const VideoPlayer = ({ vidUrl, isFree, purchase }: chapterVideo) => {
  return (
    <div className="p-6">
      {purchase.length !== 0 ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gray-900">
          <ReactPlayer
            url={vidUrl}
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
            <p className="sm:text-[15px] lg:text-[19px]">
              This Chapter Is Locked Puerchase To Open
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
