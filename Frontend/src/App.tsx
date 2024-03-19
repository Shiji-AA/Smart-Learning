import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//student side
import Login from "./Components/User/Login/Login";
import SignUp from "./Components/User/SignUp/SignUp";
import HomePage from "./Pages/User/Home/HomePage";
import Forgotpassword from "./Components/User/Login/SentOtp";
import Resetpassword from "./Components/User/Login/Resetpassword";
import Landingpage from "./Pages/User/Landingpage/Landingpage";
import VerifyOTPpage from "./Components/User/Login/VerifyOTPpage";
import Profile from "./Components/User/UserProfile/Profile";
import EditProfile from "./Components/User/UserProfile/Editprofile";
import Checkoutpage from "./Components/User/CheckOutPage/Checkoutpage";
import CourseDetailPage from "./Pages/User/CourseDetailPage/CourseDetailPage";
import Usercourseslist from "./Components/User/CourseDetail/Usercourseslist";

//tutor side
import Tutorlogin from "./Components/Tutor/Login/Tutorlogin";
import Tutorsignup from "./Components/Tutor/Signup/Tutorsignup";
import Tutordashboard from "./Pages/Tutor/Tutordashboard/Tutordashboard";
import Tutorprofile from "./Components/Tutor/Tutorprofile/Tutorprofile";
import Tutoreditprofile from "./Components/Tutor/Tutorprofile/Tutoreditprofile";
import Addcourse from "./Components/Tutor/Tutorhome/Addcourse";
import Addlesson from "./Components/Tutor/Tutorhome/Addlesson";
import Tutorcourseslist from "./Components/Tutor/Tutorhome/Tutorcourseslist";
import SingleCoursePageView from "./Components/Tutor/Tutorhome/Singleview";

//AdminSide
import Adminlogin from "./Components/Admin/Adminlogin/Adminlogin";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Categorylist from "./Components/Admin/Category/Categorylist";
import Createcategory from "./Components/Admin/Category/Createcategory";
import Courseview from "./Pages/Admin/Courseview/Courseview";
import { Toaster } from "react-hot-toast";
import Privatepages from "./Components/Privatepages/Privatepages";
import EditCategory from "./Components/Admin/Category/Editcategory ";
import Tutortable from "./Components/Admin/TutorsList/Tutortable";
import Studenttable from "./Components/Admin/StudentsList/Studenttable";
import PaymentSuccess from "./Components/User/CourseDetail/PaymentSuccess";
import CourseIntro from "./Components/User/CourseDetail/CourseIntro";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* userSide */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot" element={<Forgotpassword />} />
        <Route path="/resetPassword" element={<Resetpassword />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTPpage />} />

        <Route element={<Privatepages isStudent={true} />}>
          <Route path="/userprofile" element={<Profile />} />
          <Route path="/home" element={<Landingpage />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/usercourselist" element={<Usercourseslist />} />
          <Route path="/singleviewUser" element={<SingleCoursePageView />} />
          <Route path="/coursedetail/:id" element={<CourseDetailPage />} />
          <Route path="/checkout/:id" element={<Checkoutpage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
          <Route path="/courseintroduction" element={<CourseIntro/>} />
         
        </Route>

        {/* Tutor side */}
        <Route path="/tutorLogin" element={<Tutorlogin />} />
        <Route path="/tutorregister" element={<Tutorsignup />} />

        <Route element={<Privatepages isStudent={false} />}>
          <Route path="/tutordashboard" element={<Tutordashboard />} />
          <Route path="/tutorprofile" element={<Tutorprofile />} />
          <Route
            path="/tutoreditprofile/:tutorId"
            element={<Tutoreditprofile />}
          />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/addlesson" element={<Addlesson />} />
          <Route path="/getallcourse" element={<Tutorcourseslist />} />
          <Route path="/singleview/:id" element={<SingleCoursePageView />} />
        </Route>

        {/* Admin side */}
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/getallcategory" element={<Categorylist />} />
        <Route path="/addcategory" element={<Createcategory />} />
        <Route path="/editcategory/:id" element={<EditCategory />} />
        <Route path="/admincourselist" element={<Courseview />} />
        <Route path="/getalltutors" element={<Tutortable />} />
        <Route path="/adminstudentlist" element={<Studenttable />} />
      </Routes>
    </Router>
  );
}

export default App;
