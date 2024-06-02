"use client";
import { UploadButton } from "@/lib/uploadthing";
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface fileUpload {
  onChange: (url: string) => void;
  endPoint: keyof typeof ourFileRouter;
}
const FileUpload = ({ onChange, endPoint }: fileUpload) => {
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        toast.error("Error uploading file: " + err?.message);
      }}
    />
  );
};

export default FileUpload;
