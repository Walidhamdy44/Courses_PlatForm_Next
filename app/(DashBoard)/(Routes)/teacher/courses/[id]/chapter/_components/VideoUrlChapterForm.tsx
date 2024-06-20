"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Edit, X } from "lucide-react";
import { useState } from "react";
import { Chapter } from "@prisma/client";

interface VideoFormUrl {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().url("Invalid URL").min(1, "URL is required"),
});

const VideoUrlChapterForm = ({
  courseId,
  initialData,
  chapterId,
}: VideoFormUrl) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { videoUrl: initialData?.videoUrl || undefined },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}`,
        values
      );
      toast.success("Chapter updated successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-slate-100 p-4 rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-lg">Chapter External URL Video</span>
        {allowed ? (
          <Badge className="cursor-pointer" onClick={() => setAllowed(false)}>
            <X />
          </Badge>
        ) : (
          <Badge className="cursor-pointer" onClick={() => setAllowed(true)}>
            <Edit />
          </Badge>
        )}
      </div>
      {!allowed ? (
        <div className="pt-5 text-lg font-bold text-green-900">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gray-900">
            <ReactPlayer
              url={initialData.videoUrl || ""}
              className="absolute top-0 left-0 w-full h-full"
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      ) : null}
      {allowed ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Add URL of the Video"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setAllowed(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Update ⚡
              </Button>
            </div>
          </form>
        </Form>
      ) : null}
    </div>
  );
};

export default VideoUrlChapterForm;
