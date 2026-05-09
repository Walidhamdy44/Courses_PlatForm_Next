import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  // Check if user is an approved teacher
  let profile: any = null;
  try {
    profile = await (db as any).userProfile.findUnique({
      where: { clerkId: userId },
      select: { teacherStatus: true },
    });
  } catch (e) {}

  // Admin always has access
  const isAdmin = userId === process.env.ADMIN_USER_ID;

  if (!isAdmin && profile?.teacherStatus !== "approved") {
    return redirect("/dashboard");
  }

  return <>{children}</>;
};

export default TeacherLayout;
