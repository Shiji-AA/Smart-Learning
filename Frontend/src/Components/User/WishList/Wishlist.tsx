import { useState, useEffect } from "react";
import Navbar from "../../User/Navbar/Navbar";
import { axiosInstance } from "../../../api/axiosinstance";
import { Link, useParams } from "react-router-dom";
import circle from '../../../assets/circle.png';
import toast from 'react-hot-toast';

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  photo: string;
}

interface Wishlist {
  _id: string;
  course: Course;
}

function Wishlist() {
  const { id } = useParams();
  console.log(id, "")
  const [wishlistedCourses, setwishlistedCourses] = useState<Wishlist[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);
  
  useEffect(() => {
    axiosInstance.get('/getallwishlistitems')
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.wishlistedCourses, "wishlistedCourses");
          setwishlistedCourses(response.data.wishlistedCourses);
          setWishlistItemCount(response.data.wishlistedCourses.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching Wishlist courses:", error);
      });
  }, []);

  const filteredCourses = wishlistedCourses.filter((course: Wishlist) =>
    course?.course?.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  
  );
  //deletion from wishlist
  const handleDelete = (id: string) => {
    console.log(id, "itemId"); 
    axiosInstance.delete(`/removeWishlistItem/${id}`) 
      .then(() => {
        setwishlistedCourses(wishlistedCourses.filter((wishlist) => wishlist._id !== id)); 
        toast.success("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting wishlist item", error);
        toast.error("Error in deleting wishlist item");
      });
  }

  return (
    <>
      <Navbar wishlistItemCount={wishlistItemCount} />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Wishlisted Courses
          </h1>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              className="px-4 py-2 w-full max-w-md border border-gray-500 rounded-md focus:outline-none"
              placeholder="Search for a course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {filteredCourses.map((course: Wishlist) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 shadow-md rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course.course.photo}
                  alt="Course Thumbnail"
                />
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.course.courseName}
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {course.course.courseDescription}
                  </p>               
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800">Price: ₹{course.course.courseFee}</p>
                   
                    <Link to={`/coursedetail/${course.course._id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        View Details
                      </button>                     
                    </Link>                    
                  </div>

                  <img onClick={() => handleDelete(course?._id)} src={circle} alt="wishlistImage" height="40" width="40" />

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
