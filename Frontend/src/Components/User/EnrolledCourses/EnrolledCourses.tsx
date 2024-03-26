import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import Navbar from '../../User/Navbar/Navbar';
import { axiosInstance } from '../../../api/axiosinstance';
import {Link} from 'react-router-dom'


interface EnrolledCourse {
    _id: string;   
    courseName: string;
    courseDescription: string;
    courseDuration: string;
    courseFee: number;
    photo: string;
  
  }

function EnrolledCourses() {
  //const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {  
      axiosInstance.get(`/enrolledcourses`)
        .then((response) => {
          if (response && response.data) {
          console.log(response.data.enrolledCourses,"enrolledCourses")
            setEnrolledCourses(response.data.enrolledCourses);
          }
        })
        .catch((error) => {
          console.error("Error fetching enrolled courses:", error);
        });    
  }, []);

  const filteredCourses = enrolledCourses.filter(course =>
    course?.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleCourseClick = (courseId: string) => {
  //   navigate({`/enrolledcourseSingleview/${course._id}`});
  // };
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Enrolled Courses</h1>
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
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 shadow-md rounded-md overflow-hidden cursor-pointer"
                // onClick={() => handleCourseClick(course._id)}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course?.photo}
                  alt="Course Thumbnail"
                />
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {course?.courseName}
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {course?.courseDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800">Price: ₹{course?.courseFee}</p>


                    <Link to ={`/enrolledcourseSingleview/${course?._id}`}>
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
    </>
  );
            }  
export default EnrolledCourses;
