"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PublishCourse {
  isPublished: boolean;
  courseId: string;
  canPublished: boolean;
}

const PublishCourse = ({
  isPublished,
  courseId,
  canPublished,
}: PublishCourse) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted successfully!");
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const togglePublish = async () => {
    try {
      await axios.patch(`/api/courses/${courseId}`, {
        isPublished: !isPublished,
      });
      toast.success(
        `Course ${isPublished ? "unpublished" : "published"} successfully!`
      );
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        className="bg-yellow-300 hover:bg-yellow-500"
        onClick={togglePublish}
        disabled={!canPublished}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the Course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PublishCourse;
