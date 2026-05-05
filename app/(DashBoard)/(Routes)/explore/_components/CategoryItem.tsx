"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface CategoryItemProps {
  icon?: LucideIcon;
  label: string;
  value?: string;
}

const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          categoryId: isSelected ? null : value,
          title: currentTitle,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border",
        isSelected
          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
      )}
    >
      {Icon && (
        <Icon
          className={cn("w-4 h-4", isSelected ? "text-white" : "text-gray-400")}
        />
      )}
      {label}
    </button>
  );
};

export default CategoryItem;
