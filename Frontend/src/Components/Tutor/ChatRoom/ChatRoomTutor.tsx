import { useState, useEffect, useRef } from "react";
import { axiosInstance, axiosInstanceTutor } from "../../../api/axiosinstance";
import { useSelector } from "react-redux";
import TutorrootState from "../../../Redux/Rootstate/Tutorstate";
import { useSocket } from "../../../Providers/SocketProvider";

interface Message {
  _id: string;
  message: string | any[];
  senderId: string;
  createdAt: Date;
}

interface User {
  _id: string;
  photo: string;
  studentName: string;
}

function ChatRoomTutor() {
  const tutorData = useSelector(
    (state: TutorrootState) => state.tutor.tutordata
  );
  const user = tutorData?.tutorId;

  const [allUsers, setallUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageData, setMessageData] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const socket = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getLiveMessages = () => {
    if (!socket) return;
    socket.emit("JOIN_CHAT_TUTOR", { userId: selectedUser?._id });
    socket.on("GET_MESSAGE", () => {
      if (selectedUser?._id) {
        getMessages();
      }
    });
  };

  useEffect(() => {
    if (!socket || !user) return;
    socket?.on("connected", () => {
      console.log("connected");
    });
    socket?.on("NEW_MESSAGE", () => {
      getMessages();
    });
  }, [socket, user]);

  useEffect(() => {
    if (!selectedUser) return;
    getLiveMessages();
    return () => {
      socket?.off("GET_MESSAGE");
      socket?.emit("LEAVE_CHAT", { tutorId: selectedUser._id });
    };
  }, [selectedUser, socket]);

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

  //for fetching all messages to a particular user from tutor(Tutor to student)
  const getMessages = () => {
    if (!selectedUser?._id) return;
    axiosInstanceTutor
      .get(`/fetchchats/${selectedUser._id}`, {
        params: { id: selectedUser._id },
      })
      .then((response) => {
        if (response) {
          setMessageData(response.data?.messageData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    axiosInstance
      .get("/getuserforsidebar")
      .then((response) => {
        if (response.data) {
          setallUsers(response.data.allUsers);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !selectedUser?._id) return;
    axiosInstanceTutor
      .post(`/accesschat/${selectedUser?._id}`, {
        userId: selectedUser?._id,
        message: message,
      })
      .then((response) => {
        if (response) {
          socket?.emit("SEND_MESSAGE", {
            senderId: tutorData?.tutorId,
            receiverId: selectedUser?._id,
            message: message,
          });
          setMessage("");
          getMessages();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageData]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getRelativeTime = (createdAt: Date) => {
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
      <div>
        {/* component */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-200 border-r border-cyan-100">
            {/* Sidebar Header  */}
            <header className="p-4 border-b border-blue-300 flex justify-between items-center bg-gradient-to-r from-indigo-300 to-cyan-400 text-black">
              <h1 className="text-2xl font-semibold">Chat Room</h1>
            </header>
            {/* =========================================================================================== */}
            {/* Contact List  */}
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20 bg-blue-50">
              {allUsers.map((user) => {
                // Find the last message for the current user
                const lastMessage = messageData.find((message) => message.senderId === user._id);
                const lastMessageText = lastMessage ? lastMessage.message :null;
                const lastMessageTime = lastMessage ? getRelativeTime(lastMessage.createdAt) : "";

                return (
                  <div
                    key={user?._id}
                    onClick={() => handleUserClick(user)}
                    className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-3 rounded-md  border"
                  >
                    <div className="w-12 h-12 rounded-full mr-3">
                      <img
                        src={user?.photo}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">
                        {user?.studentName}
                      </h2>
                      <p className="text-gray-600">{lastMessageText}</p>
                      <p className="text-sm text-gray-400">{lastMessageTime}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Chat Area  */}
          <div className="flex-1  ">
            {/* Chat Header  */}
            {
              <header className="bg-cyan-400 p-4 text-gray-900">
                <h1 className="text-2xl font-semibold">
                  {" "}
                  {selectedUser?.studentName}
                </h1>
              </header>
            }

            {/* Chat Messages */}
            <div className=" bg-blue-50 h-screen overflow-y-auto p-4 pb-36 flex flex-col">
              {/* Outgoing Message--Right side */}

              {Array.isArray(messageData) &&
                messageData.map((item, index) => {
                  const relativeTime = getRelativeTime(item.createdAt);
                  const isLastMessage = index === messageData.length - 1;
                  return (
                    <div
                      key={item?._id}
                      className={`flex mb-4 cursor-pointer ${
                        item.senderId == tutorData?.tutorId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-96 ${
                          item.senderId == tutorData?.tutorId
                            ? "bg-green-700"
                            : "bg-red-700"
                        } text-white rounded-lg p-3 gap-3`}
                      >
                        <p className="self-left">{item?.message}</p>
                        <p className="text-xs text-gray-400">{relativeTime}</p>
                      </div>
                      {isLastMessage && <div ref={messagesEndRef} />}
                    </div>
                  );
                })}
            </div>

            {/* Chat Input - */}
            <footer className="bg-blue-50 border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
              {selectedUser && (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                      value={message}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setMessage(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoomTutor;
