import { useState } from "react";
import logo1 from "../../../assets/logo1.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthrootState from "../../../Redux/Rootstate/Authstate";
import { logout } from "../../../Redux/Slices/Authslice";
import { axiosInstance } from "../../../api/axiosinstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import heart from "../../../assets/heart.png";

interface Course {
  _id: string;
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  courseFee: number;
  isApproved: boolean;
  photo: string[];
  category: string;
  tutor: string;
  students: string[];
  lessons: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface NavbarProps {
  wishlistItemCount: number;
}

function Navbar({ wishlistItemCount }: NavbarProps) {
  const navigate = useNavigate();
  const [queryData, setQueryData] = useState("");
const [searchError, setSearchError] = useState<boolean>(false);
  const [searchedCourse] = useState<Course | null>(null);
  console.log(searchError)
  console.log(searchedCourse)

  const handleSearchClick = () => {
    axiosInstance
      .get("/searchcourse", {
        params: {
          searchCriteria: queryData,
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const searchedCourse = response.data[0];
           setSearchError(false);
          navigate("/usercourselist", { state: { searchedCourse } }); // Redirect to usercourselist and pass searchedCourse as state
        } else {
          setSearchError(true);
          toast.error("No matching course found");
        }
      })
      .catch((error: any) => {
        console.error("Error in fetching search results:", error);
        setSearchError(true);
      });
  };

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
            {studentUser?(
               <a
               href="/userprofile"
               className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
             >
               Profile
             </a>

            ):(null)}
           
            <a
              href="/tutorslist"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              Tutors
            </a>
            {studentUser?(
              <a
              href="/usercourselist"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              {" "}
              My Courses
            </a>
              
            ):(
              <a
              href="/usercourselist1"
              className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
            >
              {" "}
              My Courses
            </a>
            )
          
          }
          

            {
              studentUser?( <a
                href="/enrolledcourses"
                className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none"
              >
                {" "}
                Enrolled
              </a>):null
            }

                     
          </div>

          {/* searchBar */}
          <div className="rounded-full bg-white shadow flex w-1/2 ">
            <input
              type="text"
              placeholder="Search here"
              value={queryData}
              onChange={(e) => setQueryData(e.target.value)}
              className="w-full rounded-tl-full rounded-bl-full py-2 px-4"
            />
            <button
              onClick={handleSearchClick}
              className="bg-blue-300 rounded-tr-full rounded-br-full hover:bg-orange-300 py-2 px-4"
            >
              <p className="font-semibold text-base uppercase">Search</p>
            </button>
          </div>
        </div>

        {studentUser?(
             <Link to="/wishlist">
             <span
               style={{
                 borderRadius: "50%",
                 backgroundColor: "orange",
                 color: "white",
                 padding: "0.5px 3.5px",
               }}
             >
               {wishlistItemCount}
             </span>
             <img
               src={heart}
               width="50"
               height="50"
               style={{ marginLeft: "-15px", marginTop: "-9px" }}
             />
           </Link>

        ):(
          null
        )
        } 

        {studentUser ? (
          <>
            <button className="bg-blue text-white text-base font-semibold rounded-full px-3 py-1.5 flex justify-center items-center border-2 border-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              {studentUser?.name}
            </button>
            <button
              onClick={handleLogout}
              className="bg-blue text-white text-base font-semibold rounded-full px-3 py-1.5 flex justify-center items-center border-2 border-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
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
