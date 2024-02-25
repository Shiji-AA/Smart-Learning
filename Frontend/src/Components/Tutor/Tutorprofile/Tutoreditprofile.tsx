
import { useState } from "react";
//import {Link} from "react-router-dom"

function Tutoreditprofile() {
  // Define state variables to store user information
  const [username, setUsername] = useState("Alice Smith");
  const [email, setEmail] = useState("alice@example.com");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("123 Main St, City, Country");

  // Function to handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Here you can handle form submission, like sending data to backend, etc.
    // For demonstration purpose, let's just log the form data
    console.log("Form submitted:", { username, email, phone, address });
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Heading */}
      <div className="text-2xl font-semibold mb-4 text-center">Edit Tutor Profile</div>

      {/* Content */}
      <div className="flex justify-center items-center pb-8">
        <div className="max-w-4xl w-full mx-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md w-4/5 mx-auto">
            <div className="p-4 space-y-4">
              {/* Username */}
              <div className="flex items-center">
                <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="flex items-center">
                <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Address */}
              <div className="flex items-center">
                <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Submit button */}

              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
           
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutoreditprofile;
