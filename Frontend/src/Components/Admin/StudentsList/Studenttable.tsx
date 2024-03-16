import { useState, useEffect } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import Pagination from "../../Pagination/Pagination";
import Adminnavbar from "../../../Components/Admin/Adminnavbar/Adminnavbar";

interface Student {
  _id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  isBlocked: boolean;
}

function Studenttable() {
  const [studentDetails, setStudentdetails] = useState<Student[]>([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [queryData, setQueryData] = useState("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedDisplayData, setPaginatedDisplayData] = useState<Student[]>(
    []
  );

  const itemsPerPage = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedDisplayData(studentDetails.slice(startIndex, endIndex));
  }, [currentPage, studentDetails]);

  useEffect(() => {
    axiosInstanceAdmin
      .get("/getallstudents")
      .then((response) => {
        if (response.data.studentDetails) {
          setStudentdetails(response.data.studentDetails);
        }
      })
      .catch((error) => {
        console.error("Error in fetching tutor data:", error);
        toast.error("Error in fetching tutor data");
      });
  }, []);

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
    <>
      <Adminnavbar />
      <div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
        <div className="container mx-auto py-1">
          <div className="px-3 mt-10">
            {searchError && (
              <p className="text-red-600 bg-red-100 py-3 px-4 rounded-md font-bold float-right">
                No results found
              </p>
            )}
            <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
                <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">
                  Student Table
                </h3>
                <div className="flex items-center justify-center">
                  <div className="border-4 border-blue-500 rounded-lg bg-white shadow flex">
                    <input
                      type="text"
                      value={queryData}
                      onChange={(e) => setQueryData(e.target.value)}
                      placeholder="Search here"
                      className="w-full rounded-l-none py-2 px-4 border-r-0"
                    />
                    <button
                      onClick={handleSearchClick}
                      className="bg-blue-300 hover:bg-red-300 py-2 px-4 rounded-r-none border-l-0"
                    >
                      <p className="font-semibold text-base uppercase">
                        Search
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-3">Sl No</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Phone</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(paginatedDisplayData && filteredData?.length > 0
                      ? filteredData
                      : studentDetails
                    ).map((student, index) => (
                      <tr
                        key={student._id}
                        className="bg-blue-100 lg:text-black"
                      >
                        <td className="p-3 font-medium capitalize">
                          {index + 1}
                        </td>
                        <td className="p-3"> {student?.studentName}</td>
                        <td className="p-3"> {student?.studentEmail}</td>
                        <td className="p-3 uppercase"> {student?.phone}</td>

                        <td className="p-3">
                          {student.isBlocked ? (
                            <span
                              onClick={() => handleUnblockStudent(student?._id)}
                              className="bg-red-500 text-gray-50 rounded-md px-2"
                            >
                              INACTIVE
                            </span>
                          ) : (
                            <span
                              onClick={() => handleBlockStudent(student?._id)}
                              className="bg-green-600 text-gray-50 rounded-md px-2"
                            >
                              ACTIVE
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
<Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(studentDetails.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Studenttable;

      