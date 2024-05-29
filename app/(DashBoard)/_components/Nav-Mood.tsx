"use client";

import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMood = () => {
  const pathName = usePathname();
  const teacer = pathName.includes("/teacher");
  return (
    <div>
      {teacer ? (
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-3">
            Exit
            <ExternalLinkIcon />
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button variant="ghost" size="sm">
            Teacher Mood
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavMood;
