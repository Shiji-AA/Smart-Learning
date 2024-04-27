import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { axiosInstance } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import Navbar from "../../../Components/User/Navbar/Navbar";
import Pagination from "../../Pagination/Pagination";

interface Tutor {
  _id: string;
  tutorName: string;
  tutorEmail: string;
  phone: string;
  photo:string;
  experience: string;
  education: string;
  isBlocked: boolean;
}

const TutorList: React.FC = () => {
  const [tutorDetails, setTutordetails] = useState<Tutor[]>([]);
  const [queryData, setQueryData] = useState(""); // Search query
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Number of items per page
  const [wishlistItemCount,setWishlistItemCount]=useState<number>(0) //for wishlistCount

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
  // Function to filter tutorDetails based on search query
  const filteredData = tutorDetails.filter((tutor) =>
    tutor.tutorName.toLowerCase().includes(queryData.toLowerCase())
  );

  // Function to handle search query change
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryData(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

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

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Slice data for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedDisplayData = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <Navbar wishlistItemCount={wishlistItemCount} />
      <div className="mt-2 bg-gray-100">
        <h1 className="font-bold text-2xl ml-8">Our Expert Tutors</h1>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search tutor..."
          value={queryData}
          onChange={handleSearchChange}
          className="my-4 px-4 py-2 ml-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Display paginated tutor cards */}
          {paginatedDisplayData.map((tutor) => (
            <div key={tutor._id}>
              <Card className="w-full border" placeholder={undefined}>
                <CardHeader
                  floated={false}
                  className="h-48"
                  placeholder={undefined}
                >
                  <img
                    src={tutor?.photo}
                    alt="profile-picture"
                    className="object-cover-full"
                  />
                </CardHeader>
                <CardBody className="text-center" placeholder={undefined}>
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2"
                    placeholder={undefined}
                  >
                    {tutor?.tutorName}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                    placeholder={undefined}
                  >
                    {tutor?.tutorEmail}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                    placeholder={undefined}
                  >
                    {tutor?.experience}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                    placeholder={undefined}
                  >
                    {tutor?.education}
                  </Typography>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default TutorList;
