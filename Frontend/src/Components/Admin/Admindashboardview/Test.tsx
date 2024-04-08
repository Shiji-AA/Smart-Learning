import React from "react";

function Test() {
  return (
    <>
      <div className="flex justify-between ml-3 mt-10">
        <div className="flex gap-10">
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "200px" }}
          >
            <div className="text-lg text-purple-300">Total Users</div>
            <div className="text-4xl text-purple-100">72991</div>
          </div>

          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "200px" }}
          >
            <div className="text-lg text-purple-300">Total Revenue</div>
            <div className="text-4xl text-purple-100">822785</div>
          </div>

          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "200px" }}
          >
            <div className="text-lg text-purple-300">Total Tutors</div>
            <div className="text-4xl text-purple-100">1221</div>
          </div>

          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "200px" }}
          >
            <div className="text-lg text-purple-300">Total Enrollments</div>
            <div className="text-4xl text-purple-100">6222</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
