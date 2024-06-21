import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_table/DataTable";
import { columns } from "./_table/columns";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <div className="p-6">
      <Button variant="secondary">
        <Link href="/teacher/create">Craete Course !</Link>
      </Button>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default page;
