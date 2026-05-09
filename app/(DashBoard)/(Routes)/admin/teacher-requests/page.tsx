export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Shield } from "lucide-react";
import TeacherRequestList from "./_components/TeacherRequestList";

const AdminTeacherRequestsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  // Only admin can access
  if (userId !== process.env.ADMIN_USER_ID) {
    return redirect("/dashboard");
  }

  // Fetch all teacher requests
  let requests: any[] = [];
  try {
    requests = await (db as any).teacherRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {}

  // Fetch profiles for all requesters
  const userIds = [...new Set(requests.map((r: any) => r.userId))];
  let profiles: any[] = [];
  if (userIds.length > 0) {
    try {
      profiles = await (db as any).userProfile.findMany({
        where: { clerkId: { in: userIds } },
        select: {
          clerkId: true,
          displayName: true,
          firstName: true,
          lastName: true,
          email: true,
          profileImage: true,
          headline: true,
        },
      });
    } catch (e) {}
  }

  const profileMap = new Map(profiles.map((p: any) => [p.clerkId, p]));

  // Merge requests with profile data
  const requestsWithProfiles = requests.map((r: any) => ({
    ...r,
    profile: profileMap.get(r.userId) || null,
  }));

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-[#E3DFFF]">
            <Shield className="w-6 h-6 text-[#2F288B]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Teacher Requests
            </h1>
            <p className="text-sm text-gray-500">
              Review and manage teacher applications
            </p>
          </div>
        </div>

        <TeacherRequestList requests={requestsWithProfiles} />
      </div>
    </div>
  );
};

export default AdminTeacherRequestsPage;
