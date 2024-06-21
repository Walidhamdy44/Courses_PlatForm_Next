"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Edit, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import ChapterList from "./ChapterList";

interface ChapterForm {
  initialData: Course & { chapter: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  chapterTitle: z.string().min(5),
});

const ChapterForm = ({ courseId, initialData }: ChapterForm) => {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { chapterTitle: "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapter`, values);
      toast.success("Course Created Successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-slate-100 p-[15px]  rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-[19px]">
          Course Chapters{" "}
          <span className=" block text-[13px] text-gray-400">
            *At least One Chapter is Published
          </span>
        </span>
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
            <Edit />
          </Badge>
        )}
      </div>
      {!allowed ? (
        <div className="pt-[20px] text-[16px] text-gray-700">
          {initialData.chapter.length > 0 ? (
            <div className="">
              <ChapterList
                items={initialData.chapter || []}
                courseId={courseId}
              />
            </div>
          ) : (
            <p className="text-gray-400"> No Chapters yet </p>
          )}
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
              name="chapterTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder=" e.g 'Introduction to the course'"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center ">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Create 🖋️
              </Button>
            </div>
          </form>
        </Form>
      ) : null}
    </div>
  );
};

export default ChapterForm;
