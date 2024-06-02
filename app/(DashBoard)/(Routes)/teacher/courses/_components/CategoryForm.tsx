"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Course } from "@prisma/client";
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

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: {
    value: string;
    label: string;
  }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

const CategoryForm = ({
  courseId,
  initialData,
  options,
}: CategoryFormProps) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: initialData.categoryId || "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Category Updated Successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );

  return (
    <div className="bg-slate-100 p-[15px] rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 justify-between">
        <span className="text-[19px]">Course Category</span>
        <Badge className="cursor-pointer" onClick={() => setAllowed(!allowed)}>
          {allowed ? <X /> : <Edit />}
        </Badge>
      </div>
      {!allowed ? (
        <div className="pt-[20px] text-[16px] text-gray-700">
          {selectedOption ? (
            <p>{selectedOption.label}</p>
          ) : (
            <p className="text-gray-400">No category selected</p>
          )}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isSubmitting}
                      className="w-full py-[15px] px-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200 hover:bg-gray-100 disabled:opacity-50"
                    >
                      {options.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="py-[15px]"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Update ⚡
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
