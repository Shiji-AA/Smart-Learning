import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../Components/User/Navbar/Navbar';
import { axiosInstance } from '../../../api/axiosinstance';
import { useLocation } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
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
  category: {
    _id: string;
    title: string;
  };
}

function Usercourseslist() {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
  const searchedCourse = location.state?.searchedCourse;
  const [filteredCourseDetails, setFilteredCourseDetails] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('ascending');
  const [priceRange, setPriceRange] = useState<string>('All');
  const itemsPerPage = 8;

  useEffect(() => {
    axiosInstance
      .get("/getallcategory")
      .then((response) => {
        if (response.data.categoryDetails) {
          setCategoryDetails(response.data.categoryDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/getallwishlistitems')
      .then((response) => {
        if (response && response.data) {
          setWishlistItemCount(response.data.wishlistedCourses.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching Wishlist count", error);
      });
  }, []);

  useEffect(() => {
    if (searchedCourse) {
      setCourseDetails([searchedCourse]);
    } else {
      axiosInstance.get('/usercourselist')
        .then((response) => {
          setCourseDetails(response.data.courseDetails);
        })
        .catch((error) => {
          console.error('Error fetching course details:', error);
        });
    }
  }, [searchedCourse]);

  useEffect(() => {
    if (searchQuery) {
      const filteredCourses = courseDetails.filter(course =>
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourseDetails(filteredCourses);
    } else {
      setFilteredCourseDetails(courseDetails);
    }
  }, [searchQuery, courseDetails]);

  useEffect(() => {
    axiosInstance.get('/filtercourse', { params: { category: selectedCategory } })
      .then((response) => {
        if (response.data && response.data.filteredCourses) {
          setFilteredCourseDetails(response.data.filteredCourses);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategory]);



  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(event.target.value);
  };

  const filterByPriceRange = (course: Course) => {
    if (priceRange === 'All') {
      return true;
    }
   
    if (priceRange === '0-30000') {
      return course.courseFee >= 0 && course.courseFee <= 30000;
    }
    if (priceRange === '31000-60000') {
      return course.courseFee >= 31000 && course.courseFee <= 60000;
    }
    if (priceRange === '61000-90000') {
      return course.courseFee >= 61000 && course.courseFee <= 90000;
    }
    return false;
    // Add more conditions for other price ranges if needed
  };

  // Calculate the index of the first and last items to be displayed on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Get the current page items after applying price range filter
  const currentItems = filteredCourseDetails.filter(filterByPriceRange).slice(firstIndex, lastIndex);

  return (
    <>
      <Navbar wishlistItemCount={wishlistItemCount} />
      {/* FILTER & SEARCH */}
      <div>
        <body className="antialiased font-sans bg-gray-200">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-2">
              <div className="my-2 flex sm:flex-row flex-col">

                <div className="flex flex-row mb-1 sm:mb-0">                  
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                    >
                      <option value="All">All</option>
                      {categoryDetails.map((category) => (
                        <option
                          key={category._id}
                          value={category.title}>{category.title}</option>
                      ))}
                    </select>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  {/* Sort order dropdown */}
                  <select
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  >
                    <option value="ascending">Price: Low to High</option>
                    <option value="descending">Price: High to Low</option>
                  </select>
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>

                  {/* Price range dropdown */}
                  <select
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  >
                    <option value="All">All Prices</option>
                    <option value="0-30000">0 - 30000</option>
                    <option value="31000-60000">31000 - 60000</option>
                    <option value="61000-90000">61000 - 90000</option>           
                   </select>
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>


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
                    onChange={handleSearch}
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm
                   placeholder-gray-800 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              </div>
            </div>
          </div>
        </body>
      </div>

      <div className="bg-gray-100 bg-gradient-to-b from-blue-10 to-white p-4 rounded-lg">
        <div className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">What to learn next</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {currentItems.map((course) => (
              <div key={course._id} className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                <Link to={`/coursedetail/${course?._id}`}>
                  <img className="w-full h-48 object-cover" src={course?.photo} alt="Course Thumbnail" />
                </Link>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    {course.courseName}
                  </h4>
                  <p className="mt-1 text-gray-800">
                    {course.courseDescription}
                  </p>
                  <div className="flex mt-1 text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>{index < 4 ? <FaStar /> : <FaRegStar />}</span>
                    ))}
                  </div>
                  <p className="mt-1 text-gray-800">
                    ₹{course.courseFee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCourseDetails.filter(filterByPriceRange).length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Usercourseslist;
