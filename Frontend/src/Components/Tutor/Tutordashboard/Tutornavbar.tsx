
import logo1 from '../../../assets/logo1.jpg';
import { Link } from 'react-router-dom';
import tutorlogo1  from '../../../assets/tutorlogo1.png'
import { useDispatch, useSelector } from 'react-redux';
import TutorrootState from '../../../Redux/Rootstate/Tutorstate';
import { logout } from '../../../Redux/Slices/Tutorslice';


function Navbar() {
  const tutorUser = useSelector((state:TutorrootState) => state.tutor.tutordata)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="bg-gray-800">
      <div className="flex justify-between items-center h-20 px-4 md:px-6">
        {/* Logo */}
        <div>
          <img src={logo1} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-10 items-center">
          <Link to="#" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Home</Link>
          <Link to="/tutorprofile" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Profile</Link>
          <Link to="#" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Students</Link>
          <Link to="/getallcourse" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">My Courses</Link>
          <Link to="/addcourse" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2"> + Create Course </Link>
          <Link to="/addlesson" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2"> + Add Lesson</Link>
        </div>

        {/* Gap */}
        <div className="w-20"></div>

        {/* Action Buttons */}
        <div className="flex space-x-3 items-center">
          {tutorUser ? (
            <>
              <button className='text-white text-xl font-semibold rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white'>{tutorUser?.tutorName}</button>  
              <button onClick={handleLogout} className='text-white text-xl font-semibold bg-blue-600 rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white'>Logout</button>
            </>
          ) 
          : 
           (
            <>
              <Link to="/tutorlogin" className="text-white text-xl font-semibold  rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white">Become a Tutor?</Link>
              <Link to="/login"      className="text-white text-xl font-semibold bg-blue-600 rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white">Log In</Link>
               <Link to="/register"   className="text-white text-xl font-semibold bg-blue-600 border-2 border-blue-600 rounded-full px-4 py-.05 flex justify-center items-center leading-9 md:hover:bg-blue-600 md:hover:text-white">Sign Up</Link>
             </>
          )
}
         
          <div className="rounded-full overflow-hidden">
            <Link to = "">
            <img src={tutorlogo1} alt="Student Logo" className="h-10 w-10" />
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
