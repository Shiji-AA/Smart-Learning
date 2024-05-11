import { useState, useEffect } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";

function Adminstatistics() {
  const [count, setCount] = useState({
    adminRevenue: 0,
    totalUsersCount: 0,
    totalOrderCount: 0,
    totalTutorCount: 0,
    totalCourseCount: 0,
  });
  

  useEffect(() => {
    axiosInstanceAdmin
      .get("/totalcount")
      .then((response) => {
        if (response) {
          console.log(response.data, "totalSales");
          setCount(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="bg-gray-100 ml-3 mt-10 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500 mb-6 md:mb-0"
            style={{ minWidth: "300px", minHeight: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Users</div>
            <div className="text-4xl text-purple-100">
              {count?.totalUsersCount}
            </div>
          </div>
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500 mb-6 md:mb-0"
            style={{ minWidth: "300px", minHeight: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Tutors</div>
            <div className="text-4xl text-purple-100">
              {count?.totalTutorCount}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500 mb-6 md:mb-0"
            style={{ minWidth: "300px", minHeight: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Orders</div>
            <div className="text-4xl text-purple-100">
              {count?.totalOrderCount}
            </div>
          </div>
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500 mb-6 md:mb-0"
            style={{ minWidth: "300px", minHeight: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Revenue</div>
            <div className="text-4xl text-purple-100">
              {count?.adminRevenue}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminstatistics;
