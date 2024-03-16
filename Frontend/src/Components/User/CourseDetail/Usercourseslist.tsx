import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../Components/User/Navbar/Navbar';
import { axiosInstance } from '../../../api/axiosinstance';

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

function Usercourseslist() {
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);

  useEffect(() => {
    axiosInstance.get('/usercourselist')
      .then((response) => {
        setCourseDetails(response.data.courseDetails);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-10 to-white p-4 rounded-lg">
        <div className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">What to learn next</h2>         
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
             {/* Card starts here */}
            {courseDetails.map((course) => (
              <div key={course._id} className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                <Link to="/coursedetail">
                  <img className="w-full h-48 object-cover" src={course?.photo} alt="Course Thumbnail" />
                </Link>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    {course.courseName}
                  </h4>
                  <p className="mt-1 text-gray-800">
                    {course.courseDescription}
                  </p>
                  <p className="mt-1 text-gray-800">
                    ₹{course.courseFee} 
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Usercourseslist;
