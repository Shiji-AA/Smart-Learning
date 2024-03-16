import { useState } from "react";
import logo1 from "../../../assets/logo1.jpg";
import { Link } from "react-router-dom";
//import studentlogo from '../../../assets/studentlogo.jpg';
import { useDispatch, useSelector } from "react-redux";
import AuthrootState from "../../../Redux/Rootstate/Authstate";
import { logout } from "../../../Redux/Slices/Authslice";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const studentUser = useSelector(
    (state: AuthrootState) => state.auth.userdata
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
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
              href="/home"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Home
            </a>
            <a
              href="/userprofile"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Profile
            </a>
            <a
              href=""
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Students
            </a>
            <a
              href="/usercourselist"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              My Courses
            </a>
          </div>
        </div>

        {studentUser ? (
          <>
            <button className="text-white text-xl font-semibold  rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white">
              {studentUser?.name}
            </button>
            <button
              onClick={handleLogout}
              className="text-white text-xl font-semibold bg-blue-600 rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/tutorlogin"
              className="text-white text-xl font-semibold  rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white"
            >
              Become a Tutor?
            </Link>
            <Link
              to="/login"
              className="text-white text-xl font-semibold bg-blue-600 rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="text-white text-xl font-semibold bg-blue-600 border-2 border-blue-600 rounded-full px-4 py-.05 flex justify-center items-center leading-9 md:hover:bg-blue-600 md:hover:text-white"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
