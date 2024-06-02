"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

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
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Edit, ImageIcon, Upload, X } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";
import { urlToHttpOptions } from "url";

interface ImageForm {
  initialData: Course;

  courseId: string;
}

const formSchema = z.object({
  imgUrl: z.string().min(1, {
    message: "Course Cover Image Is Required.",
  }),
});

const ImageForm = ({ courseId, initialData }: ImageForm) => {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imgUrl: initialData?.imgUrl || "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Cover Image Updated Successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-slate-100 p-[15px]  rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-[19px]">Course Cover</span>
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
        <div className="pt-[20px] text-[16px] text-gray-700">
          {initialData.imgUrl && (
            <div className="flex items-center justify-center bg-slate-200 p-3 mt-3 aspect-video">
              <Image
                src={initialData.imgUrl}
                alt={initialData?.description || "Course description"}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}

          <div
            className="flex items-center  cursor-pointer justify-center bg-slate-200 p-3 h-60"
            onClick={() => {
              setAllowed(true);
            }}
          >
            <ImageIcon width={50} height={50} />
          </div>
        </div>
      ) : null}
      {allowed ? (
        <div className="flex items-center justify-center flex-col p-4">
          <FileUpload
            endPoint="courseImage"
            onChange={(url) => {
              if (url) onSubmit({ imgUrl: url });
            }}
          />
          <div className="text-sm  text-muted-foreground mt-[20px]">
            16:9 asbict ratio (Recommended)
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageForm;
