"use client";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";

interface categoryItem {
  icon?: IconType;
  lable: string;
  value?: string;
}

const CategoryItem = ({ lable, icon: Icon, value }: categoryItem) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const curentCategryId = searchParams.get("categryId");
  const curentTitle = searchParams.get("title");

  const isSelected = curentCategryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          categryId: isSelected ? null : value,
          title: curentTitle,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  };

  return (
    <div className="pb-[20px]">
      <Button
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 bg-green-200 text-black hover:text-white hover:bg-green-400",
          isSelected && "bg-green-600 text-white"
        )}
      >
        {Icon && <Icon size={20} />}
        <div className="truncate">{lable}</div>
      </Button>
    </div>
  );
};

export default CategoryItem;
