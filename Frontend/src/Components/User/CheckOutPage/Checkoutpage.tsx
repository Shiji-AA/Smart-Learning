import { useEffect, useState } from 'react';
import Navbar from '../../../Components/User/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { axiosInstance } from "../../../api/axiosinstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

const CheckoutPage = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/checkout/${id}`)
      .then((response) => {
        if (response.data.courseDetails) {
          setCourseDetails(response.data.courseDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(to bottom, #3182CE, #ffffff)' }}>
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Checkout Here
          </h1>

          <div className="flex justify-between items-center mb-8">
            <div className="max-w-md cursor-pointer rounded-lg bg-white p-4 shadow-md">
              <img
                className="w-full h-60 object-cover rounded-lg"
                src={courseDetails?.photo}
                alt="course"
              />
              <div className="mt-4">
                <h4 className="font-bold text-gray-800">
                  {courseDetails?.courseName}
                </h4>
                <p className="text-gray-600">
                  {courseDetails?.courseDescription}
                </p>
                <p className="text-gray-700 mt-2">
                  Duration: {courseDetails?.courseDuration}
                </p>
              </div>
            </div>

            <div className="max-w-md cursor-pointer rounded-lg bg-white bg-opacity-90 p-4 shadow-md">
              <h5 className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                ₹ {courseDetails?.courseFee}
              </h5>  
              <h2 className="text-xl font-semibold text-blue-600">
                Pay with Razorpay
              </h2>
              <p className="text-gray-600 mt-2">
                Secure and convenient payments with Razorpay.
              </p>
              {/* <Link to="/razorpay-payment"> */}
              <Link to="/paymentSuccess">
                <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                  Proceed with Razorpay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
