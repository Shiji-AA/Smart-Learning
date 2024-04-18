import { useState, useEffect } from "react";
import logo1 from "../../../assets/logo1.jpg";
import { logout } from "../../../Redux/Slices/Adminslice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminrootState from "../../../Redux/Rootstate/Adminstate";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";

interface Notification {
  _id: string;
  message: string;
  type: string;
  isRead: boolean;
}

function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminUser = useSelector(
    (state: AdminrootState) => state.admin.admindata
  );
  console.log(adminUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin");
  };

  useEffect(() => {
    axiosInstanceAdmin
      .get("/getnotifications")
      .then((response) => {
        if (response.data) {
          console.log(response.data, "notifications");
          const { notificationCount } = response.data;
          setNotificationCount(notificationCount);
          setNotifications(response.data.notifications);
        }
      })
      .catch((error) => {
        console.error("Error in fetching tutor data:", error);
      });
  }, []);

  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between p-3 bg-gray-800">
        <img src={logo1} className="h-10 w-10" alt="ACME" width="120" />
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            <img
              className={menuOpen ? "hidden" : "block"}
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="40"
              height="40"
            />
            <img
              className={menuOpen ? "block" : "hidden"}
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="40"
              height="40"
            />
          </button>
        </div>
        <div
          className={`w-full flex-grow md:flex md:items-center md:w-auto ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-right text-bold mt-5 md:mt-0 border-t-2 border-white-900 md:border-none">
            <a
              href="/admindashboard"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Home
            </a>
            <a
              href="/adminstudentlist"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Students
            </a>
            <a
              href="/getalltutors"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Instructors
            </a>
            <a
              href="/getallcategory"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Category
            </a>
            <a
              href="/admincourselist"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Courses
            </a>
          </div>
        </div>

        {/* MODAL STARTS */}
        <div>
          <link
            rel="stylesheet"
            href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css"
          />
          <div>
            <button type="button" onClick={() => setIsOpen(true)}>
              <div className="relative m-2 inline-flex">
                <div className="absolute bottom-auto left-0 right-auto top-0 z-10 inline-block -translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-90 rounded-full bg-red-600 text-white p-1.5 text-xs">
                  {notificationCount}
                </div>
                <div className="flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-900 px-3 py-1 text-center text-white shadow-lg dark:text-gray-200">
                  <span className="[&>svg]:h-8 [&>svg]:w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </button>

            {isOpen && (
              <div
                id="authentication-modal"
                aria-hidden="true"
                className="fixed inset-0 overflow-x-hidden overflow-y-auto h-full top-0 left-0 z-50 flex justify-center items-center"
              >
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                  <div className="flex justify-end p-2">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3 px-3 lg:px-4 pb-2 sm:pb-4 xl:pb-6  bg-yellow-00">
                    {notifications.map((notification) => (
                      <div key={notification._id} className="w-1/2 mx-auto p-2">
                        <div
                          className="leading-normal text-blue-600 bg-blue-200 rounded-lg"
                          role="alert"
                        >
                          <h2 className="text-base font-semibold">
                            {notification.type}
                          </h2>
                          <p className="mt-1 text-sm">{notification.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></script>
        </div>
        {/* MODAL endS */}

        {adminUser && (
          <button
            onClick={handleLogout}
            className={`toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-500 hover:bg-blue-900 text-white md:rounded ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            Logout
          </button>
        )}
        {/* <img src={adminlogo1} alt="Student Logo" className="h-10 w-10" /> */}
      </nav>
    </div>
  );
}

export default Navbar2;
