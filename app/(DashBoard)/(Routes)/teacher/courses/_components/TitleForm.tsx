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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Edit, X } from "lucide-react";
import { useState } from "react";

interface FormTitle {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Course Name must be at least 5 characters.",
  }),
});

const TitleForm = ({ courseId, initialData }: FormTitle) => {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Created Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-slate-100 p-[15px]  rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-[19px]">Course Title</span>
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
      {allowed ? (
        <p className="pt-[20px] text-[20px] font-bold text-green-900">
          {initialData.title}
        </p>
      ) : null}
      {allowed ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder=" e.g 'Advanced Web Development'"
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
                onClick={() => {
                  setAllowed(!allowed);
                }}
              >
                Cancle
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

export default TitleForm;
