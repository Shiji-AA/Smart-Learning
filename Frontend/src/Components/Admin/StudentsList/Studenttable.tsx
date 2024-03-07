import { useState,useEffect } from 'react';
import { axiosInstanceAdmin } from '../../../api/axiosinstance';
import toast from 'react-hot-toast'

interface Student{
    _id: string;
    studentName: string;
    studentEmail: string;
    phone: string;
    isBlocked: boolean;
}

function Studenttable() {
    const [studentDetails, setStudentdetails] = useState<Student[]>([]);
    const [filteredData, setFilteredData] = useState<Student[]>([]);//search
    const [queryData, setQueryData] = useState("");//search
    const [searchError, setSearchError] = useState<boolean>(false);//search

     useEffect(()=>{
        axiosInstanceAdmin.get('/getallstudents')
        .then((response)=>{
            if(response.data.studentDetails){
                setStudentdetails(response.data.studentDetails)
            }
        })
        .catch((error) => {
            console.error("Error in fetching tutor data:", error);
            toast.error("Error in fetching tutor data");
          });

     },[]) 

     //search
     const handleSearchClick = () => {
        axiosInstanceAdmin
          .get("/searchstudent", {
            params: {
              searchCriteria: queryData,
            },
          })
          .then((response) => {
            if (response.data) {
              setFilteredData(response.data);
              setSearchError(response.data.length === 0);
            }
          })
          .catch((error) => {
            console.error("Error in fetching search results:", error);
            toast.error("Error in fetching search results");
          });
      };
      const handleBlockStudent = (id: string) => {
        axiosInstanceAdmin
          .post(`/unliststudent/${id}`)
          .then((response) => {
            const updatedStudents = studentDetails.map((student) => {
              if (student._id === id) {
                return { ...student, isBlocked: true };
              }
              return student;
            });
            setStudentdetails(updatedStudents);
            if (response.data.message) {
              toast.success(response.data.message);
            }
          })
          .catch((error) => {
            console.error("Error in blocking student:", error);
            toast.error("Error in blocking student");
          });
      };
    
      const handleUnblockStudent = (id: string) => {
        axiosInstanceAdmin
          .post(`/reliststudent/${id}`)
          .then((response) => {
            const updatedStudents = studentDetails.map((student) => {
              if (student._id === id) {
                return { ...student, isBlocked: false };
              }
              return student;
            });
            setStudentdetails(updatedStudents);
            if (response.data.message) {
              toast.success(response.data.message);
            }
          })
          .catch((error) => {
            console.error("Error in unblocking student:", error);
            toast.error("Error in unblocking student");
          });
      };


    return (
        <div className="container mx-auto py-1">    
        <div className="px-3 mt-10"> 
        {searchError && (
        <p className="text-red-600 bg-red-100 py-3 px-4 rounded-md font-bold float-right">
          No results found
        </p>
      )}
        <div className="max-w-3xl mx-auto bg-pink-100 rounded-lg overflow-hidden shadow-md">
        <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
        <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">Student Table</h3>
        <div className="flex items-center justify-center">
    <div className="border-4 border-blue-500 rounded-lg bg-white shadow flex" >
        <input
            type="text"
            value={queryData}
            onChange={((e)=>setQueryData(e.target.value))}
            placeholder="Search here"
            className="w-full rounded-l-none py-2 px-4 border-r-0" />
        <button onClick={handleSearchClick} className="bg-blue-300 hover:bg-red-300 py-2 px-4 rounded-r-none border-l-0">
            <p className="font-semibold text-base uppercase">Search</p>
        </button>
    </div>
</div>



        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Sl no</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Name</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Email</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Phone</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Action</th>
            </tr>
          </thead><br/>
          <tbody className="divide-y divide-gray-200">
            {(filteredData?.length >0 ? filteredData : studentDetails).map((student, index) => (
              <tr key={student._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student?.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student?.studentEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student?.phone}</td>

              
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {student.isBlocked ? (
                        <button
                          onClick={() => handleUnblockStudent(student?._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockStudent(student?._id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Block
                        </button>
                      )}
                    </td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <br/>



{/* pagination starts */}
            <div className="max-w-2xl mx-auto mt-4">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px">
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        {/* Pagination buttons */}
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page"
                                className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        {/* End of pagination buttons */}
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* pagination ends */}
        </div>
    );
}

export default Studenttable;
