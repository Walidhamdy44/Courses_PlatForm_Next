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

interface PublishChapter {
  isPublished: boolean;
  courseId: string;
  chapterId: string;
  canPublished: boolean;
}

const PublishChapter = ({
  isPublished,
  courseId,
  chapterId,
  canPublished,
}: PublishChapter) => {
  const router = useRouter();

  const onDelete = async (chapterId: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapter/${chapterId}`);
      toast.success("Chapter deleted successfully!");
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const togglePublish = async () => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapter/${chapterId}`, {
        isPublished: !isPublished,
      });
      toast.success(
        `Chapter ${isPublished ? "unpublished" : "published"} successfully!`
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
              This action will delete the chapter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(chapterId);
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

export default PublishChapter;
