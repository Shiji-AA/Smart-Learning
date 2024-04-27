import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Revenue per Month",
    },
  },
};

interface LineChartProps {
  orderMonthlyData : number[],
  revenueMonthlyData: number[],
}

const LineChart: React.FC<LineChartProps> = ({ orderMonthlyData, revenueMonthlyData }) => {
    console.log('orderMonthlyData:', orderMonthlyData);
    console.log('revenueMonthlyData:', revenueMonthlyData);
  const labels = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July' , 'Aug' , 'Sept' , 'Oct' , 'Nov' , 'Dec'];
  const actualLables = labels.slice(0 , orderMonthlyData.length);

  const data = {
    labels: actualLables,
    datasets: [
      {
        label: "Orders",
        data: orderMonthlyData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Revenue",
        data: revenueMonthlyData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
        ,
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default LineChart;