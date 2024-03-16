import { useEffect, useState } from 'react';
import { axiosInstanceAdmin } from '../../../api/axiosinstance';
import toast from 'react-hot-toast';
import Pagination from '../../Pagination/Pagination';

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  photo: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

function Admincourselist() {
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedDisplayData, setPaginatedDisplayData] = useState<Course[]>([]);

  const itemsPerPage = 5;
  
//responsible for updating the current page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

//to display courseDetails
  useEffect(() => {
    axiosInstanceAdmin
      .get('/admincourselist')
      .then((response) => {
        if (response.data.courseDetails) {
          setCourseDetails(response.data.courseDetails);
        }
      })
      .catch((error) => {
        console.log("Error in fetching data", error);
        toast("Error in fetching data");
      });
  }, []);

//currentPage display
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedDisplayData(courseDetails.slice(startIndex, endIndex));
  }, [currentPage, courseDetails]);

//AdminApproval for course
  const handleToggleStatus = (id: string) => {
    axiosInstanceAdmin
      .post(`/toggleCourseStatus/${id}`)
      .then((response) => {
        const updatedCourseDetails = courseDetails.map((course) => {
          if (course._id === id) {
            return { ...course, isApproved: !course.isApproved };
          }
          return course;
        });
        setCourseDetails(updatedCourseDetails);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error toggling course status:", error);
        toast.error("Error toggling course status");
      });
  };


  return (
    <div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
      <div className="px-3 bg-white">
        <h1 className="text-3xl p-6">Course Table</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Sl no</th>
                <th scope="col" className="px-6 py-3">CourseName</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Course Description</th>
                <th scope="col" className="px-6 py-3">Duration</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Fee</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDisplayData.map((course, index) => (
                <tr className="border-b border-gray-200 dark:border-gray-700" key={course._id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {(currentPage - 1) * itemsPerPage + index + 1} {/* Adjusted index calculation ,then only we will get correct page no in the next pages*/}
                  </th>
                  <td className="px-6 py-4">{course.courseName}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{course.courseDescription}</td>
                  <td className="px-6 py-4">{course.courseDuration}</td>
                  <td className="px-6 py-4">{course.courseFee}</td>
                  <td className="px-6 py-4">
                    <img src={`${course.photo}`} alt="image" style={{ width: '40px' }} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(course._id)}
                      className={
                        course.isApproved
                          ? 'text-green-900 bg-gradient-to-r from-green-300 via-green-400 to-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                          
                          : 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2'
                      }
                    >
                      {course.isApproved ? 'Approved' : 'Not Approved'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br/>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(courseDetails.length / itemsPerPage)} 
        onPageChange={handlePageChange}
      />
      <br/>
      <br/>
    </div>
  );
}

export default Admincourselist;
