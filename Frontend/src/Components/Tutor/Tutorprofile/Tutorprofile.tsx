import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TutorrootState from "../../../Redux/Rootstate/Tutorstate";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import Tutornavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";

function Tutorprofile() {
  const tutorData = useSelector(
    (state: TutorrootState) => state.tutor.tutordata
  );
  console.log(tutorData, "tutordata ok");
  const [tutorProfileData, settutorProfileData] = useState<any | null>(null);

  useEffect(() => {
    const tutorId = tutorData?.tutorId;
    console.log(tutorId, "tutorId");
    if (tutorId) {
      axiosInstanceTutor
        .get(`/tutorprofile`)
        .then((response) => {
          console.log(response);
          if (response.data && response.data.tutorData) {
            console.log(response.data.tutorData, "tutorData");
            settutorProfileData(response.data.tutorData);
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [tutorData]);

  return (
    <>
      <Tutornavbar />

      <div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
        <div className=" min-h-screen">
          <br />
          <div className="text-2xl font-semibold mb-4 text-center">
            Tutor Profile
          </div>
          <div className="flex justify-center items-center pb-8">
            <div className="max-w-4xl w-full mx-4">
              <div className="flex flex-col">
                {/* First box */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-md w-4/5 mx-auto mb-4">
                  <div className="flex flex-col items-center p-6">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={tutorProfileData?.photo}
                    />
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                      {tutorProfileData?.tutorName}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tutorProfileData?.tutorEmail}
                    </span>
                    <div className="mt-4">
                      <label className="flex items-center mt-2">
                        <input type="file" className="hidden" />
                        {/* <button className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          Upload
                        </button> */}
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
                      <p> {tutorProfileData?.tutorName}</p>
                    </div>

                    <div className="flex items-center">
                      <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <p> {tutorProfileData?.tutorEmail}</p>
                    </div>

                    <div className="flex items-center">
                      <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                        Phone
                      </label>
                      <p> {tutorProfileData?.phone}</p>
                    </div>

                    <div className="flex items-center">
                      <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                        Education Qualification
                      </label>
                      <p> {tutorProfileData?.education}</p>
                    </div>

                    <div className="flex items-center">
                      <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                        Experience
                      </label>
                      <p> {tutorProfileData?.experience}</p>
                    </div>

                    <div className="flex items-center">
                      <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                        Education Qualification
                      </label>
                      <p> {tutorProfileData?.onlineavailability}</p>
                    </div>

                    <div className="ml-auto">
                      <Link to={`/tutoreditprofile/${tutorProfileData?._id}`}>
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
        </div>
      </div>
    </>
  );
}

export default Tutorprofile;
