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
import PaymentSuccess from "./Components/User/CourseDetail/PaymentSuccess";
import CourseIntro from "./Components/User/CourseDetail/CourseIntro";
import EnrolledCourses from "./Components/User/EnrolledCourses/EnrolledCourses";
import EnrolledSingleView from "./Components/User/EnrolledCourses/EnrolledSingleView";
import Wishlist from "./Components/User/WishList/Wishlist";
import Chat from "./Pages/User/ChatRoomStudent/ChatRoomStudent";
import BuyNow11 from "./Components/User/CourseDetail/BuyNow11";

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
import Editcourse from "./Components/Tutor/Tutorhome/Editcourse";
import OnlineCall from "./Components/Tutor/VideoCall/OnlineCall";
import Room from "./Components/Tutor/VideoCall/Room";
import Editlesson from "./Components/Tutor/Tutorhome/Editlesson";
import StudentListTutor from "./Components/Tutor/StudentListTutorSide/StudentListTutor";
import TutorsList from "./Components/User/TutorsList/TutorsList";
import Chatroomtutor from "./Pages/Tutor/ChatRoomTutor/Chatroomtutor";
import AddQuiz from "./Components/Tutor/QuizTutorSide/AddQuiz";



//AdminSide
import Adminlogin from "./Components/Admin/Adminlogin/Adminlogin";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Categorylist from "./Components/Admin/Category/Categorylist";
import Createcategory from "./Components/Admin/Category/Createcategory";
import Courseview from "./Pages/Admin/Courseview/Courseview";
import { Toaster } from "react-hot-toast";
import Privatepages from "./Components/Privatepages/Privatepages";
import PrivatePageAdmin from "./Components/Privatepages/PrivatePageAdmin";
import EditCategory from "./Components/Admin/Category/Editcategory ";
import Tutortable from "./Components/Admin/TutorsList/Tutortable";
import Studenttable from "./Components/Admin/StudentsList/Studenttable";
import Pagenotfound from "./Components/Common/Pagenotfound";
import Certificate from "./Components/User/ProgressBar/Certificate";
import StudentQuizForm from "./Components/User/QuizUserSide/StudentQuizForm";
import VideoCallMentorsDetails from "./Components/User/VideoCallMentorsDetails/VideoCallMentorsDetails";
import Usercourseslist1 from "./Components/User/CourseDetail/Usercourselist1";



function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coursedetailforhome/:id" element ={<BuyNow11/>} />
        <Route path="/usercourselist1" element={<Usercourseslist1 />} />
        <Route path="/tutorslist" element={<TutorsList/>}/>
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
          <Route path="*" element={<Pagenotfound/>} />
          <Route path="/enrolledcourses" element={<EnrolledCourses/>}/>
          <Route path="/enrolledcourseSingleview/:courseId" element={<EnrolledSingleView/>}/>
          <Route path="/getalllessons/:courseId" element={<EnrolledSingleView/>}/>
          <Route path="/postenrollmentcourseview/:orderId" element={<EnrolledSingleView/>}/>
        
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/chat/:id" element={<Chat/>}/>
          <Route path="/downloadcertificate/:courseId" element={<Certificate/>}/>
          <Route path="/getquiz/:courseId" element={<StudentQuizForm/>}/>  
          <Route path="/videocalluser/:courseId" element={<VideoCallMentorsDetails/>}/>  
                   
         
          </Route>

        {/* Tutor side */}
          <Route path="/tutorLogin" element={<Tutorlogin />} />
          <Route path="/tutorregister" element={<Tutorsignup />} />
          <Route element={<Privatepages isStudent={false} />} >
          <Route path="*" element={<Pagenotfound/>} />
          <Route path="/tutordashboard" element={<Tutordashboard />} />
          <Route path="/tutorprofile" element={<Tutorprofile />} />
          <Route path="/tutoreditprofile/:tutorId" element={<Tutoreditprofile />}/>          
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/editcourse/:id" element={<Editcourse />} />
          <Route path="/addlesson" element={<Addlesson />} />
          <Route path="/editlesson/:id" element={<Editlesson />} />
          <Route path="/getallcourse" element={<Tutorcourseslist />} />
          <Route path="/singleview/:id" element={<SingleCoursePageView />} />
          <Route path="/tutoralllessons/:id" element={<SingleCoursePageView />} />
          <Route path='/studentlisttutor' element={<StudentListTutor/>}/>
          <Route path='/videocall' element={<OnlineCall/>}/>
          <Route path='/room/:roomId' element={<Room/>}/>
          <Route path='/getuserforsidebar' element={<Chatroomtutor/>}/>
          <Route path="/addquiz/:id" element={<AddQuiz/>} />      

         </Route>

        {/* Admin side */}
        <Route path="/admin" element={<Adminlogin />} />
        <Route element={<PrivatePageAdmin/>}> 
        <Route path="*" element={<Pagenotfound/>} />
        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/getallcategory" element={<Categorylist />} />
        <Route path="/addcategory" element={<Createcategory />} />
        <Route path="/editcategory/:id" element={<EditCategory />} />
        <Route path="/admincourselist" element={<Courseview />} />
        <Route path="/getalltutors" element={<Tutortable />} />
        <Route path="/adminstudentlist" element={<Studenttable />} />
        </Route>        
      </Routes>
    </Router>
  );
}

export default App;
