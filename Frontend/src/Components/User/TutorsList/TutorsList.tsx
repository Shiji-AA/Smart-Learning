import { useState, useEffect } from "react";
import { axiosInstance } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import Pagination from "../../Pagination/Pagination";
import Navbar from "../../../Components/User/Navbar/Navbar";

interface Tutor {
  _id: string;
  tutorName: string;
  tutorEmail: string;
  phone: string;
  isBlocked: boolean;
}

function TutorsList() {
  const [tutorDetails, setTutordetails] = useState<Tutor[]>([]);
  const [filteredData, setFilteredData] = useState<Tutor[]>([]); //search
  const [queryData, setQueryData] = useState(""); //search
  const [searchError, setSearchError] = useState<boolean>(false); //search
  const [currentPage, setCurrentPage] = useState<number>(1); //for pagination
  const [paginatedDisplayData, setPaginatedDisplayData] = useState<Tutor[]>([]); //for pagination
  const [wishlistItemCount,setWishlistItemCount]=useState<number>(0) //for wishlistCount

  const itemsPerPage = 5;
  //responsible for updating the current page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  //currentPage display-Pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedDisplayData(tutorDetails.slice(startIndex, endIndex));
  }, [currentPage, tutorDetails]);

  useEffect(() => {
    axiosInstance
      .get("/tutorslist")
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

  //for wishlist count
  useEffect(()=>{
  axiosInstance.get('/getallwishlistitems')
  .then((response)=>{
    if(response && response.data){
      setWishlistItemCount(response.data.wishlistedCourses.length)
    }

  })
  .catch((error)=>{
    console.error("Error fetching Wishlist count:", error);
  })
  },[])

  const handleSearchClick = () => {
    axiosInstance
      .get("/searchTutor", {
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

  return (
    <>
      <Navbar wishlistItemCount={wishlistItemCount} />
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
              <div className="overflow-x-auto w-full">
                <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-3">Sl No</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(paginatedDisplayData && filteredData?.length > 0
                      ? filteredData
                      : tutorDetails
                    ).map((tutor, index) => (
                      <tr key={tutor._id} className="bg-blue-100 lg:text-black">
                        <td className="p-3 font-medium capitalize">
                          {index + 1}
                        </td>
                        <td className="p-3"> {tutor?.tutorName}</td>
                        <td className="p-3"> {tutor?.tutorEmail}</td>
                        <td className="p-3 uppercase"> {tutor?.phone}</td>
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
            totalPages={Math.ceil(tutorDetails.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default TutorsList;
