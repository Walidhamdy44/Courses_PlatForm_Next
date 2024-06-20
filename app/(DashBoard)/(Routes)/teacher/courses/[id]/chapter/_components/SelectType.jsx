"use client";
// SelectType.jsx
import React, { useState } from "react";
import ViedoFileUploadForm from "./VideoFileUploadForm";
import VideoUrlChapterForm from "./VideoUrlChapterForm";
import { Button } from "@/components/ui/button";

const SelectType = ({ initialData, courseId, chapterId }) => {
  const [selectedOption, setSelectedOption] = useState(null); // State to track the selected upload option

  const handleOptionClick = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  return (
    <div>
      <div className="flex items-center justify-evenly gap-4 mt-6">
        <Button
          variant={selectedOption === "file" ? "destructive" : "primary"}
          onClick={() => handleOptionClick("file")}
          className={selectedOption === "file" ? "bg-gray-200" : ""}
          disabled={selectedOption === "url"} // Disable if URL is selected
        >
          Upload File
        </Button>
        <Button
          variant={selectedOption === "url" ? "ghost" : "primary"}
          onClick={() => handleOptionClick("url")}
          className={selectedOption === "url" ? "bg-gray-200" : ""}
          disabled={selectedOption === "file"} // Disable if File is selected
        >
          Upload URL
        </Button>
      </div>

      <div className="mt-4">
        {selectedOption === "file" && (
          <ViedoFileUploadForm
            initialData={initialData}
            courseId={courseId}
            chapterId={chapterId}
          />
        )}
        {selectedOption === "url" && (
          <VideoUrlChapterForm
            initialData={initialData}
            courseId={courseId}
            chapterId={chapterId}
          />
        )}
      </div>
    </div>
  );
};

export default SelectType;
