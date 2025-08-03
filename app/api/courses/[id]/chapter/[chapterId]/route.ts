import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string; chapterId: string }> }
) => {
  try {
    const { userId } = auth();
    const { id, chapterId } = await params;

    const userOwner = await db.course.findUnique({
      where: { id: id, userId: userId as string },
    });

    if (!userOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const chapter = await db.chapter.delete({
      where: {
        id: chapterId,
        courseId: id,
      },
    });

    return NextResponse.json(chapter);
  } catch (err) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
// Mux data initialization
const { video } = new Mux({
  tokenId: process.env.MUX_ID,
  tokenSecret: process.env.MUX_SECRET,
});

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string; chapterId: string }> }
) => {
  try {
    const { userId } = auth();
    const { id, chapterId } = await params;
    
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const values = await req.json();
    const userOwner = await db.course.findUnique({
      where: { id: id, userId },
    });

    if (!userOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    let chapter;

    // Update chapter information
    chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: id,
      },
      data: { ...values },
    });

    // Handle video operations if videoUrl is provided
    if (values.videoUrl) {
      // Find existing Mux data for the chapter
      const existingVideo = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      // Delete existing video asset if it exists
      if (existingVideo) {
        await video.assets.delete(existingVideo.assetsId);
        await db.muxData.delete({
          where: {
            id: existingVideo.id,
          },
        });
      }

      // Create a new video asset with Mux
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        encoding_tier: "baseline",
        test: false,
      });

      // Save Mux data in your database
      await db.muxData.create({
        data: {
          assetsId: asset.id,
          chapterId: chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
