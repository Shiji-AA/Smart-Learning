import { useSelector } from "react-redux";
import AuthrootState from "../../../Redux/Rootstate/Authstate";
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axiosinstance";


function Profile() {
   const userData = useSelector((state: AuthrootState) => state.auth.userdata); 
  const [profileData, setProfileData] = useState<any | null>(null);

  useEffect(() => {
    const userId = userData?.id;
    if (userId) {
      axiosInstance.get(`/userprofile/${userId}`)
      .then((response) => {
      if (response.data) {
      setProfileData(response.data.userData);
      }
        })
        .catch((error) => {
        console.error("Error fetching user profile:", error);
        });
    }
  }, [userData]); 

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Heading */}
      <div className="text-2xl font-semibold mb-4 text-center">Profile</div>

      {/* Content */}
      <div className="flex justify-center items-center pb-8">
        <div className="max-w-4xl w-full mx-4">
          <div className="flex flex-col">
            {/* First box */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md w-4/5 mx-auto mb-4">
              <div className="flex flex-col items-center p-6">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={userData?.image}
                  alt=""
                />
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                  {profileData?.studentName}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {profileData?.studentEmail}
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
                  <p>{profileData?.studentName}</p>
                </div>

                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <p>{profileData?.studentEmail}</p>
                </div>

                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <p>{profileData?.phone}</p>
                </div>

             
                <Link to={`/editprofile/${userData?.id}`}>              
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit Profile
                </button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
