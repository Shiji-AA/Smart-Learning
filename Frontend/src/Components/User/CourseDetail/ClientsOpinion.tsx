import { axiosInstance } from "../../../api/axiosinstance";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface RatingDocument {
  courseId: string;
  userData: any;
  rating: number;
  studentId: {
    photo: string;
    studentName: string;
  };
  review: string;
  createdAt: Date;
}

function ClientsOpinion() {
  const [ratingDetails, setRatingDetails] = useState<RatingDocument[]>([]);

  //To fetch all rating from all users
  const fetchAllRatings = () => {
    axiosInstance
      .get("/getallratings1")
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
  useEffect(() => {
    fetchAllRatings();
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 pt-28">
          <div className="mt-6 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">
                What our clients are saying
              </h1>

              <div className="mx-auto mt-6 flex">
                <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
                <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              </div>
            </div>

            <div className="mt-8 flex justify-between md:mt-0">
              <button
                title="left arrow"
                className="mx-3 rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                title="right arrow"
                className="rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:mt-12">
            {ratingDetails.map((ratings, index) => (
              <div
                key={index}
                className={`rounded-lg border p-8 dark:border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-400" : "bg-blue-200"
                }`}
              >
                <p className="leading-loose text-gray-500 dark:text-gray-400">
                  {ratings?.review}
                </p>

                <div className="-mx-2 mt-8 flex items-center">
                  <img
                    className="mx-2 h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-gray-300 dark:ring-gray-700"
                    src={ratings?.studentId?.photo}
                    alt=""
                  />

                  <div className="mx-2">
                    <h1 className="font-semibold text-gray-800 dark:text-white">
                      {ratings?.studentId?.studentName}
                    </h1>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      United States
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}

export default ClientsOpinion;
