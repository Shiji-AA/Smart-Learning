import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosinstance";
import Navbar from "../../User/Navbar/Navbar";
import chatIcon from "../../../assets/chatIcon.png";
import videocall from "../../../assets/videocall.png";

interface Lesson {
  _id: string;
  title: string;
  description: string;
  video: string;
}
interface EnrolledSingleCourse {
  _id: string;
  isLessonCompleted: boolean;
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  photo: string[];
  createdAt: string;
  updatedAt: string;
}

function EnrolledSingleView() {
  const { courseId } = useParams();
  console.log(courseId, "courseId");
  const [
    singleViewDetails,
    setSingleViewDetails,
  ] = useState<EnrolledSingleCourse | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [showDownloadButton, setshowDownloadButton] = useState(false);

  //For wishlistCount
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

  useEffect(() => {
    axiosInstance
      .get(`/getalllessons/${courseId}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data, "lessonDetails");
          setLessonDetails(response.data.lessonDetails?.lessons);
        }
      })
      .catch((error) => {
        console.error("Error fetching lesson details:", error);
      });
  }, [courseId]);

  useEffect(() => {
    axiosInstance
      .get(`/enrolledcourseSingleview/${courseId}`)
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
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!singleViewDetails) {
    return <div>Course not found</div>;
  }

  const handleLessonClick = (lessonVideo: any) => {
    window.open(lessonVideo);
    const totalVideos = lessonDetails ? lessonDetails?.length : 0;
    const newProgressPercentage = Math.min(
      progressPercentage + 100 / totalVideos,
      100
    );
    const roundedPercentage = parseFloat(newProgressPercentage.toFixed(2));
    setProgressPercentage(roundedPercentage);
    if (roundedPercentage > 98) {
      setshowDownloadButton(true);
      //for making the status of lessonCompleted true in db
      axiosInstance
        .put(`/lessoncompleted/${courseId}`, { isLessonCompleted: true })
        .then((response) => {
          console.log("Lesson completion status updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating lesson completion status:", error);
        });
    }
  };

  const getColor = () => {
    if (progressPercentage < 40) {
      return "#ff0000";
    } else if (progressPercentage < 70) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };
  const getEvaluationStatus = (progressPercentage: any) => {
    if (progressPercentage < 10) {
      return;
    }
    if (progressPercentage < 40) {
      return "Needs Improvement"; // Red
    } else if (progressPercentage < 70) {
      return "Fair Progress"; // Orange
    } else {
      return "Excellent Progress";
    }
  };

  return (
    <>
      <Navbar wishlistItemCount={wishlistItemCount} />

      <div className="flex justify-center bg-gradient-to-r from-gray-100 to-indigo-100 py-6 ">
        <div className="max-w-4xl flex justify-between mx-4 rounded-lg overflow-hidden shadow-xl">
          <div className=" w-1/2 bg-white shadow-md rounded p-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-800">
              Course Details
            </h1>
            <h2 className="text-2xl font-bold mb-4">
              {singleViewDetails?.courseName}
            </h2>
            <div className="mb-4">
              <p className="font-bold">Description:</p>
              <p>{singleViewDetails?.courseDescription}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Duration:</p>
              <p>{singleViewDetails?.courseDuration}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Fee:</p>
              <p>₹{singleViewDetails?.courseFee}</p>
            </div>
            <div>
              {singleViewDetails?.photo &&
                singleViewDetails?.photo.length > 0 && (
                  <img
                    src={singleViewDetails?.photo[0]}
                    alt="Course"
                    className="w-full rounded-lg shadow-lg"
                  />
                )}
            </div>
          </div>

          <div className="w-1/2 bg-white shadow-md rounded p-8">
            <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
              <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4 text-indigo-800">
                Your Lesson Here!!
              </h3>
            </div>
            <div className="w-full">
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
                    lessonDetails?.map((lesson, index) => (
                      <tr
                        key={lesson._id}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        }
                      >
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
              <br />
              <br />
              <br />
              <br />

              {/* Progressbar */}
              {singleViewDetails?.isLessonCompleted ? (
                <div className="flex flex-row justify-between">
                  {/* Button for downloading certificate */}
                  <Link to={`/downloadcertificate/${courseId}`}>
                    <button className="mt-3 bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-4 rounded">
                      View your certificate
                    </button>
                  </Link>

                  {/* Button for taking a quiz */}
                  <Link to={`/getquiz/${courseId}`}>
                    <button className="mt-3 bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-4 rounded">
                      Take a Quiz
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="block p-4 m-auto bg-gray-300 rounded-lg shadow w-72">
                    <div>
                      <span className="text-xs font-light inline-block  px-2 uppercase rounded-full text-white bg-blue-500">
                        Progress
                      </span>
                    </div>

                    <div
                      className="bg-yellow-200 rounded-lg "
                      style={{ width: 250, height: 20 }}
                    >
                      <div
                        className="w-full h-5 bg-gray-400 rounded-full mt-3"
                        style={{
                          width: `${progressPercentage}%`,
                          backgroundColor: getColor(),
                        }}
                      >
                        <div className="w-3/4 h-full text-center text-xs text-white rounded-full">
                          {progressPercentage}%
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-center text-lg font-semibold mt-3"
                        style={{ color: getColor() }}
                      >
                        {getEvaluationStatus(progressPercentage)}
                      </p>
                    </div>

                    <Link to={`/downloadcertificate/${courseId}`}>
                      {showDownloadButton && (
                        <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                          Download Certificate
                        </button>
                      )}
                    </Link>
                  </div>
                </div>
              )}

              {/* Progressbar */}
              
              <div className="absolute bottom-0 right-0 mb-1 mr-6 flex flex-col">
                <Link to={`/videocalluser/${courseId}`} className="mb-20 block">
                  <h2 className="text-xl font-bold mb-4 sm:mb-0 sm:mr-4 text-indigo-800">
                    Video Call
                  </h2>
                  <img
                    src={videocall}
                    className="mb-20"
                    style={{ width: 160, height: 130 }}
                  />
                </Link>

                <Link to={`/chat/${courseId}`}>
                  <img
                    src={chatIcon}
                    className="mb-1"
                    style={{ width: 90, height: 90 }}
                  />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnrolledSingleView;
