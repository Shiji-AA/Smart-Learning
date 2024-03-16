import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../api/axiosinstance";

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

function CourseSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const [courseDetails, setCourseDetails] = useState<Course[]>([]);

  useEffect(() => {
    axiosInstance.get("/usercourselist").then((response) => {
      setCourseDetails(response.data.courseDetails);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Featured Courses</h1>
      <Slider {...settings}>
        {courseDetails.map((course) => (
          <div key={course._id} className="px-2">
            <div className="bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
              <figure>
                <img
                  className="w-full h-48 object-cover"
                  src={course?.photo}
                  alt="Course Thumbnail"
                />
              </figure>
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900">
                  {course.courseName}
                </h4>
                <p className="mt-1 text-gray-800">{course.courseDescription}</p>
                <p className="mt-1 text-gray-800">₹{course.courseFee}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default CourseSlider;
