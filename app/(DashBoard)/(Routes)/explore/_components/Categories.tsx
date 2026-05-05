"use client";

import { Category } from "@prisma/client";
import CategoryItem from "./CategoryItem";
import {
  Code,
  Database,
  Smartphone,
  Palette,
  Server,
  Music,
  Camera,
  Shield,
  Briefcase,
  Atom,
  Cpu,
} from "lucide-react";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<string, any> = {
  "Web Development": Code,
  "Data Science": Database,
  "Mobile Development": Smartphone,
  "UI/UX Design": Palette,
  DevOps: Server,
  Music: Music,
  Photoshop: Camera,
  "Cyber Security": Shield,
  "Cyber Security ": Shield,
  Business: Briefcase,
  Physics: Atom,
  "Machen Learning": Cpu,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
