import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/User/Login/Login';
import SignUp from './Components/User/SignUp/SignUp';
import HomePage from "./Pages/User/Home/HomePage";
import Forgotpassword from "./Components/User/Login/Forgotpassword";
import Resetpassword from "./Components/User/Login/Resetpassword";
import UserProfile from "./Pages/User/UserProfile/UserProfile";
import Landingpage from "./Pages/User/Landingpage/Landingpage";
import EditProfile from "./Components/User/UserProfile/Editprofile";

//tutor side
import Tutorlogin from "./Components/Tutor/Login/Tutorlogin";
import Tutorsignup from "./Components/Tutor/Signup/Tutorsignup";
import Tutordashboard from "./Pages/Tutor/Tutordashboard/Tutordashboard";
import Tutorprofile from "./Components/Tutor/Tutorprofile/Tutorprofile";
import Tutoreditprofile from "./Components/Tutor/Tutorprofile/Tutoreditprofile";

//AdminSide
import Adminlogin from "./Components/Admin/Adminlogin/Adminlogin"
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Categorylist from "./Components/Admin/Category/Categorylist";
import Createcategory from "./Components/Admin/Category/Createcategory";
import Courseview from "./Pages/Admin/Courseview/Courseview";
import Addcourse from "./Components/Tutor/Tutorhome/Addcourse";
import Addlesson from "./Components/Tutor/Tutorhome/Addlesson";
import Tutorcourseslist from "./Components/Tutor/Tutorhome/Tutorcourseslist";
import SingleCoursePageView from "./Components/Tutor/Tutorhome/Singleview";
import { Toaster } from "react-hot-toast";
import Privatepages from "./Components/Privatepages/Privatepages";


function App() {
  return (
    <Router>
      <Toaster position ='top-right'/>
      <Routes>
      <Route path="/" element={<HomePage />} />

        {/* userSide */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} /> 
        <Route path="/forgot" element={<Forgotpassword />} /> 
        <Route path="/reset" element={<Resetpassword />} /> 
        <Route path="/register" element={<SignUp />} /> 

        <Route element={<Privatepages/>}>
        <Route path="/userprofile" element={<UserProfile/>}  />  
        <Route path="/home" element={<Landingpage/>}  />  
        <Route path="/editprofile" element={<EditProfile/>}  /> 
        <Route path="/usercourselist" element={<Tutorcourseslist/>}  /> 
        <Route path="/singleview" element={<SingleCoursePageView/>} />
        </Route>

          {/* Tutor side */} 
        <Route path="/tutorLogin" element={<Tutorlogin/>} />
        <Route path="/tutorregister" element={<Tutorsignup/>} />
        <Route path="/tutordashboard" element={<Tutordashboard/>} />
        <Route path="/tutorprofile" element={<Tutorprofile/>} />
        <Route path="/tutoreditprofile" element={<Tutoreditprofile/>} />
        <Route path="/addcourse" element={<Addcourse/>} />
        <Route path="/addlesson" element={<Addlesson/>} />
        <Route path="/tutorcourseslist" element={<Tutorcourseslist/>} />
        <Route path="/singleview" element={<SingleCoursePageView/>} />

           {/* Admin side */}
           <Route path="/admin" element={<Adminlogin/>} />
           <Route path="/admindashboard" element={<Dashboard/>} />
           <Route path="/categorylist" element={<Categorylist/>} />
           <Route path="/createcategory" element={<Createcategory/>} />
           <Route path="/admincourselist" element={<Courseview/>} />
           
           
           


          
        </Routes>
    </Router>
  
  )
}

export default App
