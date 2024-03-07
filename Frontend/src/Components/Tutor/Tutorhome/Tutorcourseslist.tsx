import {Link} from "react-router-dom"
import { useEffect ,useState} from "react";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import toast from 'react-hot-toast'

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee:number;
  photo: string;  
  createdAt: string;
  updatedAt: string;
  }
function Tutorcourseslist() {
  const [courseDetails,setCourseDetails]= useState<Course[]>([])

  useEffect(()=>{
  axiosInstanceTutor.get('/getallcourse')
  .then((response)=>{
  if(response.data.courseDetails){
  console.log("i am course details",courseDetails)
  setCourseDetails(response.data.courseDetails)
}

})
.catch((error)=>{
  console.error("Error fetching data:", error);
  toast("Error fetching data. Please try again later.");
})
},[]) 


  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Courses List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courseDetails.map(course => (
          <div key={course._id} className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700">
            <img
              className="w-full h-auto rounded-t-xl"
              src={course?.photo}
              alt="Course Thumbnail"
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{course.courseName}</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{course.courseDescription}</p>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Duration: {course.courseDuration} hours</p>
              <p className="mt-1 text-gray-500 dark:text-gray-400">CourseFee: {course.courseFee} Rupees</p>            
              <Link to={`/singleview/${course?._id}`} className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
               Details
               </Link>
            </div>
          </div>
        ))}        
      </div>     
    </div>
  );
}

export default Tutorcourseslist;




