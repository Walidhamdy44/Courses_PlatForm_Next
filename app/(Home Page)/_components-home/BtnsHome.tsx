import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const BtnsHome = () => {
  const { userId } = auth();
  return (
    <>
      {userId ? (
        <div className="flex items-center gap-4 ">
          <Button
            variant="outline"
            className="rounded-2xl border-green-700 border-2 hover:bg-green-400 hover:text-white"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4 ">
          <Button variant="outline" className="rounded-2xl border-green-700">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button className="rounded-2xl border-green-700">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default BtnsHome;
