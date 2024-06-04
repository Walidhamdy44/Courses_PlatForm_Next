import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <SignUp />
    </div>
  );
}
