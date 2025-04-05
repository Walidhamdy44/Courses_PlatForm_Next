import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Get insights into your teaching performance and student engagement.
        </p>
      </header>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Students
          </h2>
          <p className="text-4xl font-bold text-blue-500 mt-4">1,245</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Courses Completed
          </h2>
          <p className="text-4xl font-bold text-green-500 mt-4">320</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Average Rating
          </h2>
          <p className="text-4xl font-bold text-yellow-500 mt-4">4.8</p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Bar Chart
            </h3>
            <div className="relative h-48">
              <div className="absolute bottom-0 w-1/5 bg-blue-500 h-3/4"></div>
              <div className="absolute bottom-0 left-1/4 w-1/5 bg-green-500 h-2/3"></div>
              <div className="absolute bottom-0 left-2/4 w-1/5 bg-yellow-500 h-1/2"></div>
              <div className="absolute bottom-0 left-3/4 w-1/5 bg-red-500 h-1/4"></div>
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Pie Chart
            </h3>
            <div className="relative w-48 h-48 mx-auto">
              <div
                className="absolute w-full h-full rounded-full bg-blue-500"
                style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
              ></div>
              <div
                className="absolute w-full h-full rounded-full bg-green-500"
                style={{ clipPath: "polygon(50% 50%, 100% 100%, 0 100%)" }}
              ></div>
              <div
                className="absolute w-full h-full rounded-full bg-yellow-500"
                style={{ clipPath: "polygon(50% 50%, 0 100%, 0 0)" }}
              ></div>
              <div className="absolute w-24 h-24 bg-gray-100 rounded-full top-12 left-12"></div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span>
                Category Physics
              </p>
              <p>
                <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
                Category Java Script
              </p>
              <p>
                <span className="inline-block w-3 h-3 bg-yellow-500 mr-2"></span>
                Category Engineering
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Recent Activity
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex justify-between">
            <span className="text-gray-600">Student A completed Course 1</span>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </li>
          <li className="py-4 flex justify-between">
            <span className="text-gray-600">
              Student B rated Course 2 5 stars
            </span>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </li>
          <li className="py-4 flex justify-between">
            <span className="text-gray-600">
              Student C enrolled in Course 3
            </span>
            <span className="text-gray-500 text-sm">3 days ago</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AnalyticsPage;
