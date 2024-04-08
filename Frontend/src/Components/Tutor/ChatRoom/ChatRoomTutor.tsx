/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import ChatrootState from "../../../Redux/Rootstate/Chatstate";
import MessagerootState from "../../../Redux/Rootstate/Messagestate";
import { useSelector } from "react-redux";
import { axiosInstance, axiosInstanceChat } from "../../../api/axiosinstance";
//import Tuturnavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";

interface Message {
  _id: string;
  message: string | any[];
}

interface User {
  _id: string;
  studentName: string; 
}

function ChatRoomTutor() {

  const chat = useSelector((state: ChatrootState) => state.chat.selectedchat);
  console.log(chat, "chat");
  const message = useSelector(
    (state: MessagerootState) => state.message.selectedmessage
  );
  console.log(message, "message");

  const [allUsers, setallUsers] = useState<User[]>([]); // to list users in the sidebar
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // to show name on the message heading
  const [messageData, setMessageData] = useState<Message | string>(""); // Initialize as an empty string


  //for fetching all messages to a particular user
  useEffect(() => {
    if (!selectedUser?._id) return; // Check if selectedUser is available  
    axiosInstanceChat.get(`/fetchchats/${selectedUser._id}`, { params: { id: selectedUser._id } })
      .then((response) => {
        if (response) {
          console.log(response.data?.messageData,"messageData");
          setMessageData(response.data?.messageData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedUser?._id]);


//getting sidebarUsers
  useEffect(() => {
    axiosInstance
      .get("/getuserforsidebar")
      .then((response) => {
        if (response.data) {
          console.log(response.data.allUsers, "allUsers");
          setallUsers(response.data.allUsers);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);


  //for selecting a particular user while clicking on sidebar
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  //for submitting a message(send button)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageData || !selectedUser?._id) return;
    axiosInstanceChat
      .post(`/accesschat/${selectedUser?._id}`, {
        userId: selectedUser?._id,
        message: messageData,
      })
      .then((response) => {
        if (response) {
          console.log(response.data,"messages");
          setMessageData("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <Tuturnavbar /> */}
      {/* <h1 style={{backgroundColor:"pink"}}>CHAT ROOM</h1> */}

      <div className="flex h-screen overflow-hidden bg-blue-gray-500">
        {/* SIDE BAR */}
        <div className="w-1/4 border-r border-gray-300 b bg-red-100">
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-blue-400 text-white">
            <div className="max-w-2xl mx-auto">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
            <div className="relative">
              <div
                id="menuDropdown"
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
              >
                <ul className="py-2 px-3">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 2
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {allUsers.map((user) => (
              <div
                key={user?._id}
                onClick={() => handleUserClick(user)}
                className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{user?.studentName}</h2>
                  <p className="text-gray-600">How are you!!</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================MESSAGE CONTAINER================================= */}

        <div className="flex-1 bg-gray-400">
          {selectedUser && (
            <header className="bg-orange-200 p-4 text-gray-700">
              <h1 className="text-2xl font-semibold">
                {selectedUser?.studentName}
              </h1>
            </header>
          )}

            {/* StudentSide */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
            <div className="flex mb-4 cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                 />
                </div>
                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p className="text-gray-700">HeyHey</p>
              </div>
           </div>


            {/* TutorSide */}
            {Array.isArray(messageData) && messageData.map((item) => (
  <div key={item._id} className="flex flex-col items-end mb-4 cursor-pointer">
    <div className="flex flex-col max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
      <p>{item?.message}</p>
      <div className="text-xs text-gray-300">12:48 PM</div>
    </div>
    <div className="w-9 h-9 rounded-full flex items-center justify-center mt-1">
      <img
        src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
        alt="My Avatar"
        className="w-8 h-8 rounded-full"
      />
    </div>
  </div>
))}
      

         </div>

          {/* Message posting Section */}

          <footer className="bg-green-300 border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            {selectedUser && (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={typeof messageData === 'string' ? messageData : messageData?.message || ''}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setMessageData(e.target.value);
                    }}
                    className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}
          </footer>
        </div>
        {/* MESSAGE CONTAINER ENDS HERE */}
      </div>
    </>
  );
}

export default ChatRoomTutor;
