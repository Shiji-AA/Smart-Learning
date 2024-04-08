import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import Tutornavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";

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

function Tutorcourseslist() {
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);

  useEffect(() => {
    axiosInstanceTutor
      .get("/getallcourse")
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
      <Tutornavbar />
      <div className="bg-gradient-to-b from-blue-10 to-white p-4 rounded-lg ">
        <div className="min-h-screen">
          <br />
          <h1 className="text-3xl font-bold mb-4">My Courses !!!</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {courseDetails.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden"
              >              
                  <img
                    className="w-full h-48 object-cover"
                    src={course?.photo}
                    alt="Course Thumbnail"
                  />             

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {course.courseName}
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {course.courseDescription}
                  </p>
                  <p className="mt-1 text-gray-700">
                     Duration: {course.courseDuration} 
                  </p>
                  <p className="mt-1 text-gray-700">
                     ₹{course.courseFee}
                  </p>
                  <Link to={`/singleview/${course?._id}`}
                    className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tutorcourseslist;
