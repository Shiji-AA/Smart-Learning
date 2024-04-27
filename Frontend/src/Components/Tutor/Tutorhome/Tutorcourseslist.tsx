import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import Tutornavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";
import { FaStar, FaRegStar } from 'react-icons/fa';
import Pagination from '../../Pagination/Pagination';

interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
  category: string; // Add category field to Course interface
}

function Tutorcourseslist() {
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedDisplayData, setPaginatedDisplayData] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredCourseDetails, setFilteredCourseDetails] = useState<Course[]>([]);

  const itemsPerPage = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  useEffect(() => {
    axiosInstanceTutor
      .get("/categories")
      .then((response) => {
        if (response.data) {       
          setCategoryDetails(response.data.categoryDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedDisplayData(filteredCourseDetails.slice(startIndex, endIndex));
  }, [currentPage, filteredCourseDetails, itemsPerPage]);

  useEffect(() => {
    axiosInstanceTutor
      .get("/getallcourse")
      .then((response) => {
        if (response.data.courseDetails) {
          setCourseDetails(response.data.courseDetails);
          setFilteredCourseDetails(response.data.courseDetails); // Initialize filteredCourseDetails with all courses
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  useEffect(() => {
    const filteredCourses = courseDetails.filter(course =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourseDetails(filteredCourses);
  }, [searchQuery, courseDetails]);

  useEffect(() => {
    axiosInstanceTutor.get('/filtercoursetutor', { params: { category: selectedCategory } })
      .then((response) => {
        if (response.data && response.data.filteredCourses) {
          setFilteredCourseDetails(response.data.filteredCourses);
        }})
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  
    if (selectedValue === "All") {
      setFilteredCourseDetails(courseDetails);
    } else {
      const filteredCourses = courseDetails.filter(
        (course) => course.category === selectedValue
      );
      setFilteredCourseDetails(filteredCourses);
    }
  };

  return (
    <>
      <Tutornavbar />
      <div className="bg-gradient-to-b from-blue-10 to-white p-4 rounded-lg ">
        <div className="min-h-screen">
          <h1 className="text-3xl font-bold mb-6">My Courses !!!</h1>
          <div className="flex justify-start items-center  pl-5 mb-6">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="appearance-none h-full rounded-r border-t  border-l sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-gray-100 border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value="All">Filter</option>
                {categoryDetails.map((category) => (
                  <option
                    key={category._id}
                    value={category.title}>{category.title}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {/* SEARCH */}
            <div className="block relative">
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                      <path
                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                      </path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-gray-100 text-sm
                   placeholder-gray-800 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {paginatedDisplayData.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course?.photo}
                  alt="Course Thumbnail"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {course.courseName}
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {course.courseDescription}
                  </p>
                  <p className="mt-1 text-gray-700">
                    Duration: {course.courseDuration} 
                  </p>
                  <div className="flex mt-1 text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>{index < 4 ? <FaStar /> : <FaRegStar />}</span>
                    ))}
                  </div>
                  <p className="mt-1 text-gray-700">
                    ₹{course.courseFee}
                  </p>
                  <Link to={`/singleview/${course?._id}`}
                    className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />  
      <div className="bg-gray-200">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredCourseDetails.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Tutorcourseslist;
