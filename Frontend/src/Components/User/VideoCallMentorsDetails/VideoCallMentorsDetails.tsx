import { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { axiosInstance } from "../../../api/axiosinstance";
import AuthrootState from "../../../Redux/Rootstate/Authstate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OnlineCall() {
  const navigate = useNavigate();
  const userData = useSelector((state: AuthrootState) => state.auth.userdata);
  const studentName = userData?.name; 
  const [tutorDetails, setTutorDetails] = useState<any[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/tutorslist")
      .then((response) => {
        if (response.data) {
          console.log(response.data.tutorDetails, "tutorDetails");
          setTutorDetails(response.data.tutorDetails);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleRoomJoinStudent = (roomId: string) => {
    const joinRoom = async () => {
      if (!roomId) {
        console.error("Room ID is undefined.");
        return;
      }

      const appID = 110512590;
      const serverSecret = "cea33c1288f174102390d39c66057a6e";
      const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        studentName
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: document.getElementById("meetingContainer"),
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:4000/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    };

    joinRoom();
  };

  const handleBack = () => {  
    navigate(-1); 
  };

  return (
    <>
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-pink-900 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-white">
                    Tutors Available Online
                  </h3>
                </div>
                <div className="absolute right-0 mr-4">
                  <button
                    onClick={handleBack}
                    className="bg-blue-600 hover:bg-blue-700 py-1 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-200 border-pink-700">
                      Tutor Name
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-200 border-pink-700">
                      Qualification
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-200 border-pink-700">
                      Experience
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-200 border-pink-700">
                      Online Availability
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-200 border-pink-700">
                      Join button
                    </th>
                  </tr>
                </thead>
                {tutorDetails.map((tutor) => (
                  <tbody key={tutor.id}>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <img
                          src={tutor?.photo}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        />
                        <span className="ml-3 font-bold text-white">
                          {tutor?.tutorName}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {tutor?.education}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-circle text-orange-500 mr-2"></i>
                        {tutor?.experience}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {tutor?.onlineavailability}
                          </td>
                        </div>
                      </td>

       
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        <button
                          onClick={() => handleRoomJoinStudent("shiji123")} 
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                        >
                          Join
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OnlineCall;
