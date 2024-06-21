"use client";

import { Category } from "@prisma/client";
import CategoryItem from "./CategoryItem";
import {
  FcMultipleDevices,
  FcEngineering,
  FcCamera,
  FcMusic,
  FcPrivacy,
  FcCommandLine,
  FcBusiness,
  FcSynchronize,
} from "react-icons/fc";

import { IconType } from "react-icons/lib";

interface category {
  items: Category[];
}
const iconMap: Record<Category["name"], IconType> = {
  Engineering: FcEngineering,
  Photoshop: FcCamera,
  "Cyber Security ": FcPrivacy,
  Music: FcMusic,
  Physics: FcSynchronize,
  "Web Development": FcMultipleDevices,
  "Machen Learning": FcCommandLine,
  Business: FcBusiness,
};

const Categories = ({ items }: category) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      {items.map((item) => {
        return (
          <CategoryItem
            lable={item.name}
            key={item.id}
            icon={iconMap[item.name]}
            value={item.id}
          />
        );
      })}
    </div>
  );
};

export default Categories;
