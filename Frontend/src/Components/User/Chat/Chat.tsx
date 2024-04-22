  import React, { useState, useEffect, useRef } from "react";
  import { axiosInstance } from "../../../api/axiosinstance";
  import { useParams } from "react-router-dom";
  import { useSelector } from "react-redux";
  import AuthrootState from "../../../Redux/Rootstate/Authstate";
  import { useSocket } from "../../../Providers/SocketProvider";

  // interface Message {
  //   _id: string;
  //   message: string | any[];
  //   createdAt: Date;
  // }

  interface Tutor {
    _id: string;
    TutorName: string;
  }
  // interface User {
  //   id: string;
  //   studentName: string;
  // }

  // interface EnrolledSingleCourse {
  //   _id: string;
  //   tutor: string;
  //   isLessonCompleted: boolean;
  //   courseId: string;
  //   courseName: string;
  //   courseDescription: string;
  //   courseDuration: string;
  //   courseFee: number;
  //   photo: string[];
  //   createdAt: string;
  //   updatedAt: string;
  // }

  function Chat() {
    const { id: courseId } = useParams();
    const userData = useSelector((state: AuthrootState) => state.auth.userdata);
    const user = userData?.id;
    const messagesEndRef = useRef<HTMLDivElement>(null);//to get the last message at bottom of window

    // Initialize state variables
    // const [singleViewDetails,setSingleViewDetails] = useState<EnrolledSingleCourse | null>(null);
    // const [loading, setLoading] = useState(true);
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
    const [messageData, setMessageData] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const socket = useSocket();

    const getLiveMessages = () => {
      if (!socket) return;
      socket.emit("JOIN_CHAT_STUDENT", { tutorId: selectedTutor });
      socket.on("GET_MESSAGE", () => {
        console.log("getMessages")
        getMessages();
      });
    };

    useEffect(() => {
      if (!socket || !user || !selectedTutor) return;
      socket?.on("connected", () => {
        console.log("connected");
        getLiveMessages();
      });
      return ()=>{
        socket?.emit("LEAVE_CHAT",{ tutorId: selectedTutor })
      }

      // socket?.on("NEW_MESSAGE", (data) => {});
    }, [socket, user, selectedTutor]);

    useEffect(() => {
      // JavaScript for showing/hiding the menu
      const menuButton = document.getElementById("menuButton");
      const menuDropdown = document.getElementById("menuDropdown");

      const handleClickOutside = (e: MouseEvent) => {
        if (
          !menuDropdown?.contains(e.target as Node) &&
          !menuButton?.contains(e.target as Node)
        ) {
          menuDropdown?.classList.add("hidden");
        }
      };

      menuButton?.addEventListener("click", () => {
        if (menuDropdown?.classList.contains("hidden")) {
          menuDropdown?.classList.remove("hidden");
        } else {
          menuDropdown?.classList.add("hidden");
        }
      });
      document.addEventListener("click", handleClickOutside);

      // Cleanup event listener on unmount
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

  //to get the last message at bottom of window
    useEffect(() => {
      scrollToBottom();
    }, [messageData]);

    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Fetch course details
    useEffect(() => {
      axiosInstance
        .get(`/enrolledcourseSingleview/${courseId}`)
        .then((response) => {
          if (response.data) {
            const selectedTutor = response.data?.singleViewDetails.tutor;
            //console.log(selectedTutor)
            // setSingleViewDetails(response.data.singleViewDetails);
            setSelectedTutor(selectedTutor);
            // setLoading(false);
          } else {
            // setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
          // setLoading(false);
        });
    }, [courseId]);

    // Posting Messages to Tutor
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message || !selectedTutor) return;// SOCKETIO: Sending message
      // HTTP POST request
      axiosInstance
        .post(`/accesschat/${selectedTutor}`, {
          userId: selectedTutor,
          message: message,
        })
        .then((response) => {
          if (response) {
            // console.log(response.data, "messages");
            setMessage("");
            getMessages();
          }
        })
        .catch((error) => {
          console.error("Error sending message via HTTP POST request:", error);
        });

      socket?.emit(
        "SEND_MESSAGE",
        {
          senderId: userData?.id,
          receiverId: selectedTutor,
          message: message,
        },
        (error: any) => {
          if (error) {
            console.error("Error sending message via socket.io:", error);
          } else {
            console.log("Message sent via socket.io successfully");
            setMessage("");
            getMessages();
          }
        }
      );
    };

    const getMessages = () => {
      const userId = userData?.id;//studentId;
      console.log(userId)
      if (!userId && !selectedTutor) return;
      //console.log(selectedTutor, "tutor id")
      axiosInstance
        .get(`/fetchchats/${userId}`, { params: { id: userId } })
        .then((response) => {
          if (response) {
            console.log(response)
            //console.log(response.data?.messageData,"messageDataSTUDENT");
            setMessageData(response.data.messageData);
            console.log(response.data.messageData, "this is messagedata")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //for fetching all messages to a particular user from tutor(Tutor to student)
    useEffect(() => {
      getMessages();
    }, [userData]);

    const getRelativeTime = (createdAt:Date | null | any) => {
      const messageDate: any = new Date(createdAt);
      const today: any = new Date();
      const diffInDays = Math.floor(
        (today - messageDate) / (1000 * 60 * 60 * 24)
      );

      if (diffInDays === 0) {
        return messageDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (diffInDays === 1) {
        return "Yesterday";
      } else {
        return `${diffInDays} days ago`;
      }
    };

    return (
      <>
      <>
      {/* component */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-gray-300 bg-gray-200"></div>
        {/* Main Chat Area  */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header  */}
          <header className="bg-gradient-to-r from-indigo-300 to-cyan-400 p-4 text-gray-900">
            <h1 className="text-2xl font-semibold">Tutor</h1>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-36 bg-blue-50">
            {/* Outgoing Message--Right side-message sent by student*/}
            {Array.isArray(messageData) &&
              messageData.map((item, index) => {
                const relativeTime = getRelativeTime(item.createdAt);
                const isLastMessage = index === messageData.length - 1;

                return (
                  <div
                    key={item?._id}
                    className={`flex mb-4 cursor-pointer ${
                      item.senderId == userData?.id
                        ? "justify-end "
                        : "justify-start "
                    }`}
                  >
                    <div
                      className={`flex max-w-96 ${
                        item.senderId == userData?.id
                          ? "bg-green-700 "
                          : "bg-red-700"
                      } text-white rounded-lg p-3 gap-3`}
                    >
                      <p>{item?.message}</p>
                      <p className="text-xs text-gray-400">{relativeTime}</p>
                    </div>
                    {isLastMessage && <div ref={messagesEndRef} />}
                  </div>
                );
              })}
          </div>

          {/* Chat Input */}
          <footer className="bg-blue-50 border-t border-gray-300 p-4 w-full">
            {selectedTutor && (
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  className="flex-1 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
                >
                  Send
                </button>
              </form>
            )}
          </footer>
        </div>
      </div>
    </>
      </>
    );
  }

  export default Chat;
