import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosinstance';
import { useLocation } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

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

function Usercourseslist1() {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
  console.log(categoryDetails)
  const searchedCourse = location.state?.searchedCourse;
  const [filteredCourseDetails, setFilteredCourseDetails] = useState<Course[]>([]);
  const [searchQuery] = useState<string>('');
  const [selectedCategory] = useState<string>('All');
  const [sortOrder] = useState<string>('ascending');
  const [priceRange] = useState<string>('All');


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
    if (searchedCourse) {
      setCourseDetails([searchedCourse]);
    } else {
      axiosInstance.get('/usercourselist1')
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
          // Filtered courses based on selected category
          let filteredCourses = response.data.filteredCourses;
  
          // Apply price range filtering
          filteredCourses = filteredCourses.filter(filterByPriceRange);
  
          // Sort filtered courses based on sort order
          filteredCourses.sort((a:any,b:any) => {
            if (sortOrder === 'ascending') {
              return a.courseFee - b.courseFee;
            } else {
              return b.courseFee - a.courseFee;
            }
          });
  
          setFilteredCourseDetails(filteredCourses);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategory, sortOrder, priceRange]);
  

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };
  
// // working
//   const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(event.target.value);
//   };


// // working
//   const handleSortOrderChange = () => {
//     setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
//   };

// //   working
//   const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPriceRange(event.target.value);
//   };
// working
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
 
  };

  const currentItems = filteredCourseDetails.filter(filterByPriceRange);

  return (
    <>
    
      {/* FILTER & SEARCH */}
    

      <div className="bg-gray-100 bg-gradient-to-b from-blue-10 to-white p-4 rounded-lg">
        <div className="min-h-screen">
        
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {currentItems.map((course) => (
              <div key={course._id} className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                <Link to={`/coursedetailforhome/${course?._id}`}>
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
   
    </>
  );
}

export default Usercourseslist1;
