import { useState } from 'react';
import logo1 from '../../../assets/logo1.jpg';
//import adminlogo1 from '../../../assets/adminlogo1.png';
import { logout } from '../../../Redux/Slices/Adminslice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AdminrootState from '../../../Redux/Rootstate/Adminstate';

function Navbar2() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const adminUser = useSelector((state: AdminrootState) => state.admin.admindata);
    console.log(adminUser);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin');
    };

    return (
        <div>
            <nav className="flex flex-wrap items-center justify-between p-3 bg-gray-800">
                <img src={logo1} className="h-10 w-10" alt="ACME" width="120" />
                <div className="flex md:hidden">
                    <button onClick={toggleMenu}>
                        <img className={menuOpen ? "hidden" : "block"} src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
                        <img className={menuOpen ? "block" : "hidden"} src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" />
                    </button>
                </div>
                <div className={`w-full flex-grow md:flex md:items-center md:w-auto ${menuOpen ? "block" : "hidden"}`}>
                    <div className="text-right text-bold mt-5 md:mt-0 border-t-2 border-white-900 md:border-none">
                        <a href="/admindashboard" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none">Home</a>
                        <a href="/adminstudentlist" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none">Students</a>
                        <a href="/getalltutors" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none">Instructors</a>
                        <a href="/getallcategory" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none">Category</a>
                        <a href="/admincourselist" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white-900 md:border-none">Courses</a>
                    </div>
                </div>
                {adminUser && (
                    <button onClick={handleLogout} className={`toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-500 hover:bg-blue-900 text-white md:rounded ${menuOpen ? "block" : "hidden"}`}>Logout</button>
                )}
                {/* <img src={adminlogo1} alt="Student Logo" className="h-10 w-10" /> */}
            </nav>
        </div>
    );
}

export default Navbar2;
