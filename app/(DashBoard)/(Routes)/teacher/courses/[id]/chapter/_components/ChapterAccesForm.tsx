"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Edit, X } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FormTitle {
  initialData: {
    ifFree: boolean;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  ifFree: z.boolean().default(false),
});

const ChapterAccesForm = ({ courseId, initialData, chapterId }: FormTitle) => {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ifFree: !!initialData.ifFree },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}`,
        values
      );
      toast.success("Chapter Updated Successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-slate-100 p-[15px] rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-[19px]">Chapter Access</span>
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
        <p className="pt-[20px] text-[20px] font-bold text-green-900">
          {initialData.ifFree ? "Chapter Is Free" : "Chapter Not Free"}
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
              name="ifFree"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>
                  <FormLabel className="ml-3">Mark as Free</FormLabel>
                  <div>
                    <FormDescription>
                      Check This Box If You Want to make this chapter Free to
                      Preview
                    </FormDescription>
                  </div>
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

export default ChapterAccesForm;
