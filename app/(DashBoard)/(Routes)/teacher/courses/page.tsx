import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="p-6">
      <Button variant="secondary">
        <Link href="/teacher/create">Craete Course !</Link>
      </Button>
    </div>
  );
};

export default page;
