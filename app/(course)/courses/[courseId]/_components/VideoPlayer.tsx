"use client";

import { Lock, PlayCircle } from "lucide-react";
import ReactPlayer from "react-player";
import { Purchase } from "@prisma/client";

interface chapterVideo {
  vidUrl: string;
  isFree: boolean;
  purchase: Purchase | null;
}

const VideoPlayer = ({ vidUrl, isFree, purchase }: chapterVideo) => {
  return (
    <div>
      {purchase !== null || isFree ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg bg-gray-900">
          <ReactPlayer
            url={vidUrl}
            className="absolute top-0 left-0 w-full h-full"
            controls
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          {/* Lock overlay */}
          <div className="flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Lock className="w-7 h-7 text-white/80" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">
                Chapter Locked
              </p>
              <p className="text-sm text-white/60 max-w-sm">
                Purchase this course to unlock all chapters and start learning
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
