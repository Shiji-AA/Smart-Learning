import { useState, useEffect } from "react";
import {Link }from 'react-router-dom'
import { axiosInstance } from "../../../api/axiosinstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  isEnrolled:boolean;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

function BuyNow1() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/coursedetail/${id}`)
      .then((response) => {
        if (response.data.courseDetails) {
          console.log("i am course details", courseDetails);
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
      <div
        className="w-full text-white flex items-center"
        style={{
          background: "linear-gradient(90deg, #C9D6FF, #E2E2E2)",
          // background: "linear-gradient(90deg, #93A5CF, #E4EfE9)", 
          height: "60px",
        }}
      >
        <p className="text-center" style={{ color: "black", margin: "auto" }}>
          <b>Personal Plan</b> | Accelerate your career with access to 8,000 of
          our top courses.{" "}
          <span style={{ textDecoration: "underline" }}>Learn more</span>
        </p>
      </div>
      <div className="flex h-96 items-center justify-center bg-gray-800">
        {" "}
        {/* Increased height of the parent div */}
        <div className="flex-1 p-6 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            {courseDetails?.courseName}
          </h1>
          <h4 className="text-gray-100 text-2xl">
            {courseDetails?.courseDescription}
          </h4>
          <h4 className="mt-2 text-gray-100 text-2xl">
            Duration: {courseDetails?.courseDuration} hours
          </h4>
          <p className="mb-2 text-white">Created By Smart Learning platform</p>{" "}
          {/* Added text-white class */}
          <p className="text-white">
            Last updated 3/2024, 🌐 English, English [CC], French [Auto]
          </p>{" "}
          {/* Added text-white class */}
        </div>

        <div className="max-w-md mr-20 cursor-pointer rounded-lg bg-white p-4 shadow duration-150 hover:scale-105 hover:shadow-md h-full bg-white">
          {" "}
          {/* Added bg-white class */}
          <img
            className="w-full h-70 rounded-lg object-cover object-center"
            src={courseDetails?.photo}
            alt="course"
          />{" "}
          {/* Increased height of the image div */}
          <h4 className="my-4 pl-4 font-bold text-gray-700">
            Subscribe to Smart Learning's top courses
          </h4>
          <h5 className="mb-4 ml-4 text-xl font-semibold text-gray-800">
            ₹ {courseDetails?.courseFee}
          </h5>


{courseDetails?.isEnrolled ===false ? (
   <Link to ={`/checkout/${courseDetails?._id}`}>
   <button className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md">
     Start Subscription
   </button>
   </Link> 

):(
 
  <Link to ={`/enrolled/${courseDetails?._id}`}>
  <button className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md">
  Enrolled
  </button>
  </Link> 

)
 } 

          <br />
        </div>
        
      </div>
    </>
  );
}

export default BuyNow1;
