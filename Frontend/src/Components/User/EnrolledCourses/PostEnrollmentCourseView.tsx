
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosinstance';
import Navbar from '../../User/Navbar/Navbar';

interface Lesson {
    _id: string;
    title: string;
    description: string;
    video: string;
  }
  
  interface EnrolledSingleCourse {
    _id: string;
    amount: number;
    lessons: Lesson[];
    courseId: {
      _id: string;
      courseName: string;
      courseDescription: string;
      courseDuration: string;
      courseFee: number;
      photo: string[];
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    status: string;
    studentId: string;
    tutorId: string;
    updatedAt: string;
  }

function PostEnrollmentCourseView() {
  const { orderId } = useParams();
  const [singleViewDetails, setSingleViewDetails] = useState<EnrolledSingleCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessonDetails, setLessonDetails] = useState<Lesson | null>(null);

  useEffect(() => {
    axiosInstance.get(`/getalllessons/${orderId}`)
      .then((response) => {
        if (response.data) {
          setLessonDetails(response.data.lessonDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching lesson details:", error);
      });
  }, [orderId]);

  useEffect(() => {
    axiosInstance
      .get(`/enrolledcourseSingleview/${orderId}`)
      .then((response) => {
        if (response.data) {
          setSingleViewDetails(response.data.singleViewDetails);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!singleViewDetails) {
    return <div>Course not found</div>;
  }

  const handleLessonClick = (lessonVideo:any) => {
    window.open(lessonVideo);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-gradient-to-r from-blue-100 to-indigo-200 py-6">
        <div className="max-w-4xl flex justify-between mx-4 rounded-lg overflow-hidden shadow-xl">
          <div className="w-1/2 bg-white shadow-md rounded p-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-800">Course Details</h1>
            <h2 className="text-2xl font-bold mb-4">{singleViewDetails.courseId.courseName}</h2>
            <div className="mb-4">
              <p className="font-bold">Description:</p>
              <p>{singleViewDetails.courseId.courseDescription}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Duration:</p>
              <p>{singleViewDetails.courseId.courseDuration}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Fee:</p>
              <p>₹{singleViewDetails.amount}</p>
            </div>
            <div>
              {singleViewDetails.courseId.photo && singleViewDetails.courseId.photo.length > 0 && (
                <img src={singleViewDetails.courseId.photo[0]} alt="Course" className="w-full rounded-lg shadow-lg" />
              )}
            </div>
          </div>

          <div className="w-1/2 bg-white shadow-md rounded p-8">
            <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
              <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4 text-indigo-800">Your Lesson Here!!</h3>
            </div>

            <div className="overflow-x-auto w-full">
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
    {lessonDetails && lessonDetails.courseId && lessonDetails.courseId.lessons.map((lesson, index) => (
      <tr key={lesson._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
        <td className="p-3 font-medium">{index + 1}</td>
        <td className="p-3">{lesson.title}</td>
        <td className="p-3">{lesson.description}</td>
        <td className="p-3">
          <button
            onClick={() => handleLessonClick(lesson.video)}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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



        </div>
    )
}

export default PostEnrollmentCourseView
