import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string; chapterId: String } }
) => {
  try {
    const { userId } = auth();

    const userOwner = await db.course.findUnique({
      where: { id: params.id, userId },
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
        id: params.chapterId,
        courseId: params.id,
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
  { params }: { params: { id: string; chapterId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const values = await req.json();
    const userOwner = await db.course.findUnique({
      where: { id: params.id, userId },
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
        id: params.chapterId,
        courseId: params.id,
      },
      data: { ...values },
    });

    // Handle video operations if videoUrl is provided
    if (values.videoUrl) {
      // Find existing Mux data for the chapter
      const existingVideo = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      // Delete existing video asset if it exists
      if (existingVideo) {
        await video.assets.del(existingVideo.assetsId);
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
          chapterId: params.chapterId,
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
