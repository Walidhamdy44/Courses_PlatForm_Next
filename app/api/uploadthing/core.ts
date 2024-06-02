import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const authFunc = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => authFunc())
    .onUploadComplete(() => {}),

  ChapterVideo: f({
    video: { maxFileSize: "512GB", maxFileCount: 1 },
  })
    .middleware(() => authFunc())
    .onUploadComplete(() => {}),
  courseAttachments: f(["video", "audio", "pdf", "image", "text/html"])
    .middleware(() => authFunc())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
