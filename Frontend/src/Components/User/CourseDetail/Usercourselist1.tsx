import { useState, useEffect } from "react";
//import Navbar from '../../../Components/User/Navbar/Navbar';
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosinstance";
import { FaStar, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
  category: {
    _id: string;
    title: string;
  };
}

function Usercourseslist1() {
  // const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
  console.log(categoryDetails);


  useEffect(() => {
    axiosInstance.get('/getallwishlistitems')
      .then((response) => {
        if (response && response.data) {
          // setWishlistItemCount(response.data.wishlistedCourses.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching Wishlist count", error);
      });
  }, []);
  

  useEffect(() => {
    axiosInstance
      .get("/getallcategory")
      .then((response) => {
        if (response.data.categoryDetails) {
          setCategoryDetails(response.data.categoryDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/usercourselist1")
      .then((response) => {
        setCourseDetails(response.data.courseDetails);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });
  }, []);

  return (
    <>
  
      <div className="bg-gray-100 bg-gradient-to-b from-blue-10 to-white p-4 rounded-lg">
        <div className="min-h-screen">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            style={{ maxWidth: "1400px", margin: "0 auto" }}
          >
            {courseDetails.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden"
              >
                <Link to={`/coursedetailforhome/${course?._id}`}>
                  <img
                    className="w-full h-48 object-cover"
                    src={course?.photo}
                    alt="Course Thumbnail"
                  />
                </Link>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    {course.courseName}
                  </h4>
                  <p className="mt-1 text-gray-800">
                    {course.courseDescription}
                  </p>
                  <div className="flex mt-1 text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < 4 ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-gray-800">₹{course.courseFee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Usercourseslist1;
