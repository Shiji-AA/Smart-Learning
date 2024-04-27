import Tutornavbar from '../Tutordashboard/Tutornavbar';
import { useEffect, useState } from "react";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
//import Pagination from '../../Pagination/Pagination';

// Interface for course and student details
interface Course {
  _id: string;
  courseId: {
    courseName: string;
    courseDescription: string;
    courseDuration: string;
    courseFee: number;
    photo: string;
  };
  studentId: {
    studentName: string;
  };
  createdAt: string;
  updatedAt: string;
}
function StudentListTutor() {
  const [enrolledStudentDetails, setEnrolledStudentDetails] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    axiosInstanceTutor.get(`/enrolledstudentdetails`)
   
      .then((response) => {
        if (response.status==200) {
          console.log(response.data,"student")
          setEnrolledStudentDetails(response.data.enrolledStudentDetails);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  // Filtering enrolled students based on search query
  const filteredStudents = enrolledStudentDetails.filter((student) => {
    return student.studentId.studentName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Tutornavbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Student List</h1>
          <input
            type="text"
            placeholder="Search by student name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
          <thead className="bg-blue-800 text-white">
  <tr>
    <th className="px-4 py-2">Sl no</th>
    <th className="px-4 py-2">Student Name</th>
    <th className="px-4 py-2">Course Name</th>
    <th className="px-4 py-2">Course Description</th>
    <th className="px-4 py-2">Fee</th>
    <th className="px-4 py-2">Image</th>
    <th className="px-4 py-2">Enrolled Date</th>
  </tr>
</thead>  
            <tbody>
              {filteredStudents.map((course, index) => (
                <tr key={course._id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                  <td className="border px-4 py-2">{index + 1}</td>
                   <td className="border px-4 py-2">{course?.studentId?.studentName}</td> 
                  <td className="border px-4 py-2">{course?.courseId?.courseName}</td>
                  <td className="border px-4 py-2">{course?.courseId?.courseDescription}</td>
                  <td className="border px-4 py-2">{course?.courseId?.courseFee}</td>
                  <td className="border px-4 py-2">
                    <img src={`${course?.courseId?.photo}`} alt="Course" className="w-12 h-12 object-cover" />
                  </td>
                  <td className="border px-4 py-2">{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br/>
    </>
  );
}

export default StudentListTutor;