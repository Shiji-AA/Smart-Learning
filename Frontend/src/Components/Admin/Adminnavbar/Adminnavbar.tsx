
import logo1 from '../../../assets/logo1.jpg';
import { Link } from 'react-router-dom';
import adminlogo1  from '../../../assets/adminlogo1.png'
import { useDispatch, useSelector } from 'react-redux';
import Adminrootstate from '../../../Redux/Rootstate/Adminstate';
import { logout } from '../../../Redux/Slices/Adminslice';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const adminUser = useSelector((state:Adminrootstate) =>state.admin.admindata)
  console.log(adminUser," I am adminuser"); 

  const handleLogout = () => {
    dispatch(logout())
    navigate('/admin')
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
          <Link to="/admindashboard" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Home</Link>
          <Link to="#" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Students</Link>
          <Link to="#" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Instructors</Link>
          <Link to="/getallcategory" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Category</Link>
          <Link to="/admincourselist" className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-white md:border-b-0 md:hover:border-white md:pb-2">Courses </Link>
        </div>

        {/* Gap */}
        <div className="w-20"></div>

        {/* Action Buttons */}
        <div className="flex space-x-3 items-center">

  {adminUser && (
  <>
  <button onClick={handleLogout} className='text-white text-xl font-semibold bg-blue-600 rounded-full px-4 py-1 flex justify-center items-center md:border-2 md:border-blue-600 md:hover:bg-blue-700 md:hover:text-white'>Logout</button>
  </>
)}

          <div className="rounded-full overflow-hidden">
            <Link to = "">
            <img src={adminlogo1} alt="Student Logo" className="h-10 w-10" />
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
