import { useState, useEffect } from "react";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Tuturnavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";
import { FaStar, FaRegStar } from 'react-icons/fa';

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
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[] | null>(null);

  //for display lessons

  useEffect(() => {
    axiosInstanceTutor
      .get(`/tutoralllessons/${id}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data.lessonDetails);
          setLessonDetails(response.data.lessonDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching lesson details:", error);
      });
  }, [id]);

  //for single course details
  useEffect(() => {
    axiosInstanceTutor
      .get(`/getallcourse/${id}`)
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
  }, [id]);

  //for play button
  const handleLessonClick = (lessonVideo: any) => {
    window.open(lessonVideo);
  };
  return (
    <>
    <Tuturnavbar />
    
      <div className="flex justify-center bg-gradient-to-r from-blue-100 to-indigo-200 py-6">
        <div className="max-w-screen-xl mx-auto flex justify-between w-full rounded-lg overflow-hidden shadow-xl">
          <div className="w-1/2 bg-white shadow-md rounded p-8 relative">
            <br />


            <div className="flex flex-wrap justify-between">
  <Link to={`/editcourse/${courseDetails?._id}`}>
    <button className="font-semibold bg-orange-600 hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white px-7 py-2 rounded-lg shadow-md text-xl mb-4 md:mr-6">
      Edit Course
    </button>
  </Link>
  <Link to={`/addquiz/${courseDetails?._id}`}>
    <button className="font-semibold bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white px-7 py-2 rounded-lg shadow-md text-xl">
      Add Quiz
    </button>
  </Link> 
</div>


            <br />
            <h1 className="text-3xl font-bold mb-4 text-blue-800">
              Course Details
            </h1>
            <h2 className="text-2xl font-bold mb-4">
              {courseDetails?.courseName}
            </h2>
            <div className="mb-4">
              <p className="font-bold">Description:</p>
              <p>{courseDetails?.courseDescription}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Duration:</p>
              <p>{courseDetails?.courseDuration}</p>
            </div>
            <div className="flex mt-1 text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>{index < 4 ? <FaStar /> : <FaRegStar />}</span>
                        ))}
                      </div>
            <div className="mb-4">
              <p className="font-bold">Fee:</p>
              <p>₹{courseDetails?.courseFee}</p>
            </div>
            <div>
              {courseDetails?.photo && courseDetails?.photo.length > 0 && (
                <img
                  src={courseDetails?.photo[0]}
                  alt="Course"
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </div>            
          </div>

          {/* Lesson Details */}
          <div className="w-1/2 bg-white shadow-md rounded p-8">
            <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
              <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4 text-indigo-800">
                Your Lesson Here!!
              </h3>
            </div>

            <div className="overflow-x-auto w-full">
              <div className="flex justify-end">
                <Link to= "/addlesson">
                <button className="px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Add New Lesson
                </button>
                </Link>                
              </div>
              <table className="table text-gray-900 border-separate space-y-6 text-sm w-full">
                <thead className="bg-gray-500 text-gray-900">
                  <tr>
                    <th className="p-3">Sl No</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lessonDetails &&
                    lessonDetails.map((lesson, index) => (
                      <tr
                        key={lesson._id}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        }
                      >
                        <td className="p-3 font-medium">{index + 1}</td>
                        <td className="p-3">{lesson.title}</td>
                        <td className="p-3">{lesson.description}</td>
                        <td className="p-3 flex">
                          <Link to= {`/editlesson/${lesson?._id}`}>
                          <button className="mr-2 px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500">
                            Edit
                          </button>
                          </Link>
                         
                          
                          <button
                            onClick={() => handleLessonClick(lesson.video)}
                            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            Play
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>              
              </table>                      
            </div>                    
          </div>        
        </div>        
      </div>
    </>
  );
}

export default SingleCoursePageView;
