//import { useEffect, useState } from "react";
//import studentlogo from "../../../assets/studentlogo.jpg";
//import {Link} from "react-router-dom"
import { useSelector } from "react-redux";
import TutorrootState from "../../../Redux/Rootstate/Tutorstate";
// import { axiosInstanceTutor } from "../../../api/axiosinstance";



function Tutorprofile() {
  const tutorData = useSelector((state:TutorrootState)=>state.tutor.tutordata)
  console.log(tutorData)
  // const[profileData,setProfileData] = useState <any | null>(null)

  // useEffect(()=>{
  //   const tutorId = tutorData?.id;
  //   if(tutorId){
  //     axiosInstanceTutor.get(`/tutorprofile/${tutorId}`)     
  //     .then((response)=>{
  //       console.log(response , 'ivivde va')
  //       if(response.data){
  //         console.log("API Response:", response.data); 
  //        setProfileData(response.data.tutorData)
  //        console.log("Profile Data:", profileData);
  //       }
  //     })
  //     .catch((error)=>{
        
  //       console.error("Error fetching user profile:", error);
  //     })
  //   }

  // },[tutorData])




  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Heading */}
      <div className="text-2xl font-semibold mb-4 text-center">Tutor Profile</div> 

      {/* Content */}
      <div className="flex justify-center items-center pb-8">
        <div className="max-w-4xl w-full mx-4">
          <div className="flex flex-col">
            {/* First box */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md w-4/5 mx-auto mb-4">
              <div className="flex flex-col items-center p-6">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={tutorData?.image}
                  alt=""
                />
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                {tutorData?.tutorName}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                {tutorData?.tutorEmail}
                </span>
                <div className="mt-4">
                  <label className="flex items-center mt-2">
                    <input type="file" className="hidden" />
                    <button className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Upload
                    </button>
                  </label>
                </div>
              </div>
            </div>

            {/* Second box */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md w-4/5 mx-auto">
              <div className="p-4 space-y-4">
                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <p>{tutorData?.tutorName}</p>
                </div>

                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <p>{tutorData?.tutorEmail}</p>
                 
                </div>

                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <p>{tutorData?.phone}</p>
                 
                </div>

             
                {/* <Link to="/tutoreditprofile">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit Profile
                </button>
                </Link> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorprofile;
