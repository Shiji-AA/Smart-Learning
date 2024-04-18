import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../../api/axiosinstance";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import AuthrootState from "../../../Redux/Rootstate/Authstate";
import { useSelector } from "react-redux";

function VideoCallMentorsDetails() {
  const userData = useSelector((state: AuthrootState) => state.auth.userdata);
  const [tutorDetails, setTutorDetails] = useState<any[]>([]);
  const [showCall, setShowCall] = useState(false);
  const studentMeetingContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleUnload = () => {
      setShowCall(false);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  function generateToken(tokenServerUrl: string, userID: string) {
    return fetch(
      `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  const handleMentoring = async (tutorid: string) => {
    const tutorID = tutorid;
    const studentID: any = userData?.id;

    if (tutorID) {
      await generateToken(
        "https://nextjs-token.vercel.app/api",
        studentID
      ).then((res) => {
        const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1484647939,
          res.token,
          tutorID,
          studentID,
          userData?.name
        );

        const zp = ZegoUIKitPrebuilt.create(token);

        zp.joinRoom({
          container: studentMeetingContainerRef.current!,
          sharedLinks: [
            {
              name: "Personal link",
              url: window.location.href,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          showTurnOffRemoteCameraButton: true,
          showTurnOffRemoteMicrophoneButton: true,
          showRemoveUserButton: true,
        });
      });
    }
    setShowCall(true);
  };

  return (
    <div>
      {showCall === false ? (
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
                    <tbody>
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
                            onClick={() => {
                              handleMentoring(tutor._id);
                            }}
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                          >
                            Join
                          </button>
                        </td>
                      </tr>

                      {/* Other table rows */}
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div
          className="studentCallContainer"
          ref={studentMeetingContainerRef}
          style={{ width: "100vw", height: "100vh" }}
        >
          Student Meeting Container
        </div>
      )}
    </div>
  );
}

export default VideoCallMentorsDetails;
