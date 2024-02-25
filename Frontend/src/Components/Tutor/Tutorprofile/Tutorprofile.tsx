import studentlogo from "../../../assets/studentlogo.jpg";

import {Link} from "react-router-dom"


function Tutorprofile() {
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
                  src={studentlogo}
                  alt=""
                />
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                  Alice Smith
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  alice@example.com
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
                  <input
                    type="text"
                    id="username"
                    className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value="Alice Smith"
                  />
                </div>

                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value="alice@example.com"
                  />
                </div>

                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value="1234567890"
                  />
                </div>

                <div className="flex items-center">
                  <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value="123 Main St, City, Country"
                  />
                </div>
                <Link to="/tutoreditprofile">
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

export default Tutorprofile;
