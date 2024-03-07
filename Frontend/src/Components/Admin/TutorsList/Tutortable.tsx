import { useState, useEffect } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import toast from "react-hot-toast";

interface Tutor {
  _id: string;
  tutorName: string;
  tutorEmail: string;
  phone: string;
  isBlocked: boolean;
}

function Tutortable() {
  const [tutorDetails, setTutordetails] = useState<Tutor[]>([]);
  const [filteredData, setFilteredData] = useState<Tutor[]>([]);//search
  const [queryData, setQueryData] = useState("");//search
  const [searchError, setSearchError] = useState<boolean>(false);//search

  useEffect(() => {
    axiosInstanceAdmin
      .get("/getalltutors")
      .then((response) => {
        if (response.data.tutorDetails) {
          setTutordetails(response.data.tutorDetails);
        }
      })
      .catch((error) => {
        console.error("Error in fetching tutor data:", error);
        toast.error("Error in fetching tutor data");
      });
  }, []);

  const handleSearchClick = () => {
    axiosInstanceAdmin
      .get("/searchtutor", {
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

  const handleBlockTutor = (id: string) => {
    axiosInstanceAdmin
      .post(`/unlisttutor/${id}`)
      .then((response) => {
        const updatedTutors = tutorDetails.map((tutor) => {
          if (tutor._id === id) {
            return { ...tutor, isBlocked: true };
          }
          return tutor;
        });
        setTutordetails(updatedTutors);
        if (response.data.message) {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error in blocking tutor:", error);
        toast.error("Error in blocking tutor");
      });
  };

  const handleUnblockTutor = (id: string) => {
    axiosInstanceAdmin
      .post(`/relisttutor/${id}`)
      .then((response) => {
        const updatedTutors = tutorDetails.map((tutor) => {
          if (tutor._id === id) {
            return { ...tutor, isBlocked: false };
          }
          return tutor;
        });
        setTutordetails(updatedTutors);
        if (response.data.message) {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error in unblocking tutor:", error);
        toast.error("Error in unblocking tutor");
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
            <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">
              Tutor Table
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-none border-l-0"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase"
                >
                  Sl no
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(filteredData.length > 0 ? filteredData : tutorDetails).map(
                (tutor, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {tutor.tutorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {tutor.tutorEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {tutor.phone}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {tutor.isBlocked ? (
                        <button
                          onClick={() => handleUnblockTutor(tutor._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockTutor(tutor._id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
<br/>
        {/* Pagination starts here*/}
        <div className="max-w-2xl mx-auto mt-4">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              {/* End of pagination buttons */}
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Pagination ends here*/}
      </div>
    </div>
  );
}

export default Tutortable;
