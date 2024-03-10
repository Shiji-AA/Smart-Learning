import { useState ,useEffect} from 'react';
import { axiosInstanceTutor } from '../../../api/axiosinstance';
import toast from  'react-hot-toast'
import { useParams } from 'react-router-dom';

interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  photo: string;
  courseFee: number;
  createdAt: Date;
  updatedAt: Date;
}
interface Lesson {
  _id: string;
  title: string;
  description: string;
  video: string;
  createdAt: string;
  updatedAt: string;
}


function SingleCoursePageView() {
  const {id} = useParams();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson | null>(null);

  useEffect(()=>{
    axiosInstanceTutor.get(`/getallcourse/${id}`)
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
  useEffect(()=>{
    axiosInstanceTutor.get(`/getallcourse/${id}`)
    .then((response)=>{
    if(response.data.lessonDetails){
    console.log("i am lesson details",lessonDetails)
    setLessonDetails(response.data.lessonDetails)
  }
  })
  .catch((error)=>{
    console.error("Error fetching data:", error);
    toast("Error fetching data. Please try again later.");
  })
  },[]) 

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">+ Add new lessons </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{courseDetails?.courseName}</h2>
        <img
          className="w-full h-auto mb-4"
          src={courseDetails?.photo}
          alt="Course Thumbnail"
        />
        <p className="text-gray-800 dark:text-white">{courseDetails?.courseDescription}</p>
        <p className="mt-2 text-gray-800 dark:text-white">Duration: {courseDetails?.courseDuration} hours</p>
        {/* Add any other details you want to display */}
      </div>

      <h1 className="text-3xl font-bold mb-4">Watch Lesson Videos here !!! </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{lessonDetails?.title}</h2>
        <img
          className="w-full h-auto mb-4"
          src={lessonDetails?.video}
          alt="Course Thumbnail"
        />
        <p className="text-gray-800 dark:text-white">{lessonDetails?.description}</p>
        <p className="mt-2 text-gray-800 dark:text-white">Duration: {courseDetails?.courseDuration} hours</p>
        {/* Add any other details you want to display */}
      </div>
    </div>
  );
}

export default SingleCoursePageView;
