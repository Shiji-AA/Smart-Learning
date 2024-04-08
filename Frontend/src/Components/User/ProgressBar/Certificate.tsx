import { useEffect, useState } from 'react';
import logo1 from "../../../assets/logo1.jpg";
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosinstance';
import { useSelector } from "react-redux";
import AuthrootState from "../../../Redux/Rootstate/Authstate";

interface EnrolledSingleCourse {  
  _id: string;
  courseId:string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  photo: string[];
  createdAt: string;
  updatedAt: string;
}

const Certificate = () => {
  const userData = useSelector((state: AuthrootState) => state.auth.userdata); 
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [singleViewDetails, setSingleViewDetails] = useState<EnrolledSingleCourse | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/enrolledcourseSingleview/${courseId}`)
      .then((response) => {
        if (response.data) {
          setSingleViewDetails(response.data.singleViewDetails);
          setLoading(false);//data fetching is complete
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setLoading(false);
      });
  }, [courseId]);

  return (
    <>
  <div className="container mx-auto flex justify-center items-center h-screen">
    <div className="max-w-lg w-full border border-gray-300 rounded-lg overflow-hidden shadow-xl">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
        <h1 className="text-4xl font-bold tracking-wide">Certificate of Completion</h1>
      </div>
      <div className="px-6 py-6 bg-gray-100">
        <div className="flex justify-center items-center mb-4">
          <img src={logo1} alt="ACME" className="h-16 w-16 rounded-full border-4 border-blue-700" />
          <div className="ml-4">
            <p className="text-lg font-semibold mb-1">This certificate is awarded to</p>
            <h1 className="text-2xl font-bold text-blue-700">{userData?.name}</h1>
          </div>
        </div>
        <hr className="my-4 border-t-2 border-gray-400" />
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">For the completion of:</p>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{singleViewDetails?.courseName}</h2>
          <p className="text-gray-700 leading-6">{singleViewDetails?.courseDescription}</p>
        </div>
        <div className="text-center mt-6">
          <hr className="border-t-2 border-blue-500 my-4" />
          <p className="text-gray-700">Issued Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
        <p className="text-sm">Accredited by: Smart Learning</p>
      </div>
    </div>   
  </div>

  </>
   
  );
};

export default Certificate;
