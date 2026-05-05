import { SearchX } from "lucide-react";

const NoCourses = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="p-4 rounded-full bg-gray-100 mb-4">
        <SearchX className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        No courses found
      </h3>
      <p className="text-gray-500 text-center max-w-sm">
        Try adjusting your search or filter to find what you&apos;re looking
        for.
      </p>
    </div>
  );
};

export default NoCourses;
