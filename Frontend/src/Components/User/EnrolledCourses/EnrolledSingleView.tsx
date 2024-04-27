import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosinstance";
import Navbar from "../../User/Navbar/Navbar";
import chatIcon from "../../../assets/chatIcon.png";
import videocall from "../../../assets/videocall.png";
//import { FaStar, FaRegStar } from "react-icons/fa";
//import { StarIcon } from "@heroicons/react/24/solid";
//import { Rating } from "@material-tailwind/react";
import StarRating from "../CourseDetail/StarRating";
import { useSelector } from "react-redux";
import AuthrootState from "../../../Redux/Rootstate/Authstate";
import toast from "react-hot-toast";
import Abc from "../EnrolledCourses/Abc";

interface RatingDocument {
  courseId: string| undefined;
  userData: any;
  rating: number;
  studentId: {
    photo: string;
    studentName: string;
  };
  review: string;
  createdAt: Date;
}
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
  //console.log(courseId, "courseId");
  const [
    singleViewDetails,
    setSingleViewDetails,
  ] = useState<EnrolledSingleCourse | null>(null);
  const [lessonDetails, setLessonDetails] = useState<Lesson[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [showDownloadButton, setshowDownloadButton] = useState(false);

  const userData = useSelector((state: AuthrootState) => state.auth.userdata);
  //console.log(userData,"userData");
  const [ratingDetails, setRatingDetails] = useState<RatingDocument[]>([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = async (newRating: any) => {
    setRating(newRating);
  };

  // To fetch the rating and review for a specific user

  const fetchMyRating = async () => {
    try {
      const response = await axiosInstance.get(`/getMyRating/${courseId}`);
      if (response && response.data) {
        console.log("rate", response.data);
        setRating(response.data.rating);
        setReview(response.data.review);
      }
    } catch (error) {
      console.error("Failed to fetch rating:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchMyRating();
    }
    fetchAllRatings();
  }, [courseId, userData]);

  //To fetch all rating from all users
  const fetchAllRatings = () => {
    axiosInstance
      .get(`/getallratings/${courseId}`)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.ratingDetails, "ratingDetails");
          setRatingDetails(response.data.ratingDetails);
        } else {
          toast.error("Error fetching reviews");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch rating:", error);
      });
  };

  //for posting rating and review
  const submitReviewandrating = () => {
    if (rating < 1) {
      return toast.error("select the rating star");
    }
    axiosInstance
      .post("/courserating", { rating, review, courseId })
      .then((response) => {
        if (response) {
          console.log(response.data, "rating and review");
          toast.success("rating added");
          fetchMyRating();
          fetchAllRatings();
          setReview("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          //console.log(response.data, "lessonDetails");
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

      <div className="flex justify-center bg-gray-100 py-6 ">
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

      <div>
        <Abc courseId={courseId} />
        <br/>

        {/* RATING */}

        {/* {userInfo && courseDetails?.students.includes(userInfo?._id) && ( */}
        <div className="border-t sm:mx-40 p-4  bg-white shadow-2xl">
          <h2 className="text-lg sm:text-3xl font-bold mb-2 text-center">
            Rate Your Course
          </h2>
          <StarRating
            initialRating={rating}
            ratings={rating}
            onChange={handleRatingChange}
          />
          <div className="flex justify-center items-center">
            <textarea
              id="review"
              name="review"
              className="mt-2 p-2 mx-20 block w-full border border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write your review here..."
              value={review}
              rows={4}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center items-center mt-2">
            <button
              onClick={submitReviewandrating}
              className="w-1/3 bg-gradient-to-r from-blue-300 to-blue-800 hover:from-blue-300 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              {rating ? "Update Rating" : " Submit"}
            </button>
          </div>
        </div>
        {/* )} */}

        {/* RATING END*/}

        {/* REVIEW  */}
        <div className="border-t sm:m-10 p-4">
          <h2 className="text-lg sm:text-3xl font-bold mb-2">
            Reviews And Ratings
          </h2>

          {ratingDetails.map((ratings) => (
            <article className="w-full bg-slate-50 p-4 border mb-4">
              <div className="flex items-center mb-2">
                <img
                  className="w-8 h-8 me-2 rounded-full"
                  src={ratings.studentId?.photo}
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <p>
                    {ratings.studentId?.studentName}{" "}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                    >
                      Rated On{" "}
                      {new Date(ratings.createdAt).toLocaleDateString()}
                    </time>
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-3 sm:w-4 h-3 sm:h-4 ${
                      index < ratings.rating
                        ? "text-yellow-300"
                        : "text-gray-300 dark:text-gray-500"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <p className="mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {ratings.review}
              </p>
            </article>
          ))}
        </div>
        {/* REVIEW */}
      </div>
    </>
  );
}

export default EnrolledSingleView;
