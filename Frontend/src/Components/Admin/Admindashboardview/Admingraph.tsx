import { useState, useEffect } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import LineChart from "../../../Components/Admin/Charts/LineChart";

function Adminstatistics() {
  const [orderMonthlyData, setOrderMonthlyData] = useState<number[]>([]);
  const [revenueMonthlyData, setRevenueMonthlyData] = useState<number[]>([]);

  useEffect(() => {
    axiosInstanceAdmin
      .get("/totalcount")
      .then((response) => {
        if (response) {
          console.log(response.data, "totalSales");

          setOrderMonthlyData(response.data?.orderMonthlyCounts);
          setRevenueMonthlyData(response.data?.revenueMonthlyCounts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <div className="bg-gray-100 flex justify-center ">
  <div className="flex justify-center items-bottom bg-red-300 border-2 border-blue-500">
  <div id="chart"
        className="bg-white p-16 rounded-lg shadow-xxl shadow-md violet-shadow"
        style={{ height: "550px", width: "900px" }} // Adjust height and width here
      >
        <LineChart orderMonthlyData={orderMonthlyData} revenueMonthlyData={revenueMonthlyData}/>
      </div>
  </div>
</div>

    </>
  );
}

export default Adminstatistics;
