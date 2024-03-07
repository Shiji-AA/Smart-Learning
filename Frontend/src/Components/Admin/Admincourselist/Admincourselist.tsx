import {useState,useEffect} from 'react';
import { axiosInstanceAdmin } from '../../../api/axiosinstance';
import toast from 'react-hot-toast';

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee:number;
  photo: string;  
  isApproved:boolean;
  createdAt: string;
  updatedAt: string;
  }

function Admincourselist() {
  const [courseDetails,setCourseDetails]= useState<Course[]>([])

  useEffect(()=>{
    axiosInstanceAdmin.get('/admincourselist')
    .then((response)=>{
      if(response.data.courseDetails){
        setCourseDetails(response.data.courseDetails)
      }
    })
    .catch((error)=>{
      console.log(error("Error in fetching data",error));
      toast("Error in fetching data");
    })  
  },[])

  const handleToggleStatus = (id: string) => {
    axiosInstanceAdmin
      .post(`/toggleCourseStatus/${id}`)
      .then((response) => {
        // Update the courseDetails state to reflect the changes
        const updatedCourseDetails = courseDetails.map((course) => {
          if (course._id === id) {
            return { ...course, isApproved: !course.isApproved };
          }
          return course;
        });
        setCourseDetails(updatedCourseDetails);
        // Display success message
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error toggling course status:", error);
        toast.error("Error toggling course status");
      });
  };
   

  return (
    <div className="bg-pink-100 p-4 rounded-lg">
      <div className="px-3 bg-white">
        <h1 className="text-3xl p-6">Course Table</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Sl no</th>
                <th scope="col" className="px-6 py-3">CourseName</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Course Description</th>
                <th scope="col" className="px-6 py-3">Duration</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Fee</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              {courseDetails?.map((course, index) => (
                <tr className="border-b border-gray-200 dark:border-gray-700" key={course._id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{course.courseName}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{course.courseDescription}</td>
                  <td className="px-6 py-4">{course?.courseDuration}</td>
                  <td className="px-6 py-4">{course?.courseFee}</td>
                  <td className="px-6 py-4">
                    <img src={`${course?.photo}`} alt="image" style={{ width: '40px' }} />
                  </td>
                  <td className="px-6 py-4">
                    {/* Button to toggle status */}
                    <button
                      onClick={() => handleToggleStatus(course._id)}
                      className={
                        course.isApproved
                          ? 'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                          : 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2'
                      }
                    >
                      {course.isApproved ? 'Approved' : 'Not Approved'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admincourselist;
