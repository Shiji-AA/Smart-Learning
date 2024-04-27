import { useState, useEffect } from "react";
import Navbar from "../../User/Navbar/Navbar";
import { axiosInstance } from "../../../api/axiosinstance";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa';
import Pagination from "../../Pagination/Pagination";

interface EnrolledCourse {
  _id: string;
  courseId: {
    _id:string;
    courseName: string;
    courseDescription: string;
    courseDuration: string;
    courseFee: number;
    photo: string;
  };
}

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [itemsPerPage, setItemsPerPage] = useState<number>(8);

const itemsPerPage = 8;
  useEffect(() => {
    axiosInstance
      .get(`/enrolledcourses`)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.enrolledCourses, "enrolledCourses");
          setEnrolledCourses(response.data.enrolledCourses);
        }
      })
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("getallwishlistitems")
      .then((response) => {
        if (response && response.data) {
          setWishlistItemCount(response.data.wishlistedCourses.length);
        }
      })
      .catch((error) => {
        console.error("Error in fetching wishlistCount", error);
      });
  }, []);

  const filteredCourses = enrolledCourses.filter(
    (course) =>
      course?.courseId?.courseName &&
      course?.courseId?.courseName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
    // Calculate current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  
    // Change page
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

  return (
    <>
      <Navbar wishlistItemCount={wishlistItemCount} />

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Enrolled Courses
          </h1>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              className="px-4 py-2 w-full max-w-md border border-gray-500 rounded-md focus:outline-none"
              placeholder="Search for a course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {currentItems?.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 shadow-md rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course?.courseId?.photo}
                  alt="Course Thumbnail"
                />
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {course?.courseId?.courseName}
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {course?.courseId?.courseDescription}
                  </p>
                  <div className="flex mt-1 text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>{index < 4 ? <FaStar /> : <FaRegStar />}</span>
                        ))}
                      </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800">
                      Price: ₹{course?.courseId?.courseFee}
                    </p>

                    <Link to={`/enrolledcourseSingleview/${course?.courseId?._id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCourses.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
    </>
  );
}
export default EnrolledCourses;
