import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const UserInfo = async () => {
  const user = await currentUser();

  // Function to convert the date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-200 p-6 shadow-lg sm:p-8 lg:p-10 bg-white">
      <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-300 via-cyan-600-500 to-lime-500"></span>

      <div className="sm:flex sm:gap-6">
        <div className="sm:block sm:flex-shrink-0">
          <Image
            alt="User image"
            src={user?.imageUrl!}
            width={300}
            height={300}
            className="rounded-lg object-cover shadow-md"
          />
        </div>

        <div className="mt-4 sm:mt-0 sm:ml-6">
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {user?.fullName}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {user?.emailAddresses[0].emailAddress}
          </p>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Joined:</span>{" "}
              {formatDate(user?.createdAt!)}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <span className="font-medium">Last Active:</span>{" "}
              {formatDate(user?.lastActiveAt!)}
            </p>
          </div>
          <div>
            <div className="mt-8 border-t border-gray-200"></div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Note:</span>Only You Can See This
              Information
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Phone:</span>{" "}
              {user?.phoneNumbers && user.phoneNumbers.length > 0
                ? user.phoneNumbers.join(", ")
                : "Not available"}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-5">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Edit Profile
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <SignOutButton>Sign Out</SignOutButton>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
