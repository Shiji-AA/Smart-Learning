
import logo1 from '../../../assets/logo1.jpg';
import { Link } from 'react-router-dom';
import studentlogo from '../../../assets/studentlogo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import AuthrootState from '../../../Redux/Rootstate/Authstate';
import { logout } from '../../../Redux/Slices/Authslice';


function Navbar() {
  const studentUser = useSelector((state:AuthrootState) => state.auth.userdata)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="bg-gray-800">
      <div className="flex justify-between items-center h-20 px-4 md:px-8">
        {/* Logo */}
        <div>
          <img src={logo1} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-10 items-center">
          <Link to="#" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Home</Link>
          <Link to="/usercourselist" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Courses</Link>
          <Link to="#" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Tutors</Link>
          <Link to="/userprofile" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Profile</Link>
        </div>

        {/* Gap */}
        <div className="w-24"></div>

        {/* Action Buttons */}
        <div className="flex space-x-3 items-center">
          {studentUser ? (
            <>
              <button className='text-white text-xl font-semibold  rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white'>{studentUser?.name}</button>
              <button onClick={handleLogout} className='text-white text-xl font-semibold bg-blue-600 rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white'>Logout</button>
            </>
          ) : (
            <>
              <Link to="/tutorlogin" className="text-white text-xl font-semibold  rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white">Become a Tutor?</Link>
              <Link to="/login"      className="text-white text-xl font-semibold bg-blue-600 rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white">Log In</Link>
              <Link to="/register"   className="text-white text-xl font-semibold bg-blue-600 border-2 border-blue-600 rounded-full px-4 py-.05 flex justify-center items-center leading-9 md:hover:bg-blue-600 md:hover:text-white">Sign Up</Link>
            </>
          )}
         
          <div className="rounded-full overflow-hidden">
            <Link to = "/">
            <img src={studentlogo} alt="Student Logo" className="h-10 w-10" />
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
