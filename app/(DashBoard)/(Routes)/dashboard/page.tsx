import CoursesDashboard from "./_components/CoursesDashboard";
import UserInfo from "./_components/UserInfo";

export default function DashBoard() {
  return (
    <div className="p-4 md:p-6">
      <div>
        <UserInfo />
      </div>
      <div className="w-full">
        <CoursesDashboard />
      </div>
    </div>
  );
}
