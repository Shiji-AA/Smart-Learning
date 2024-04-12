import express from "express";
const router = express.Router();
import {
  loginStudent,
  registerStudent,
  getStudentProfile,
  googleRegister,
  googleLogin,
  sendOTP,
  verifyOTP,
  resetPassword,
  getProfileById,
  updateProfile,
  userCourseList,
  getCourseDetails,
  enrolledcourses,
  enrolledcourseSingleview,
  getAllLessons,
  searchCourse,
  tutorsList,
  searchTutorStudent, 
  addWishlistItem,
  getWishlistItem,
  removeWishlistItem,
  getUsersForSidebar,
  updateLessonCompletedStatus,
  filterCourse,
  createRefreshToken,
  getAllCategoryStudent,
} from "../../Controller/StudentController/StudentController";

import { isLogin } from "../../../middleware/studentAuth";
import { accessChat } from "../../Controller/ChatController/ChatController";

router.post("/login", loginStudent);
router.post("/register", registerStudent);
router.post("/google/register", googleRegister);
router.post("/google/login", googleLogin);
//otp
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
//Forget password & reset password;
router.post("/resetPassword", resetPassword);
router.get("/userprofile", isLogin, getStudentProfile);
//StudentEditProfile
router.get("/editprofile", isLogin, getProfileById);
router.put("/updateprofile", isLogin, updateProfile);
router.get("/usercourselist", isLogin, userCourseList);
//StudentCoursePurchase
router.get("/coursedetail/:id", isLogin, getCourseDetails);
router.get("/checkout/:id", isLogin, getCourseDetails);
router.get("/enrolledcourses", enrolledcourses);
router.get("/enrolledcourseSingleview/:courseId", enrolledcourseSingleview);
router.get("/postenrollmentcourseview/:courseId", enrolledcourseSingleview);
router.get("/getalllessons/:courseId", isLogin, getAllLessons); //enrolled
router.get("/searchcourse", searchCourse);
router.get("/tutorslist", isLogin, tutorsList);
router.get("/searchTutor", searchTutorStudent);
router.post("/addWishlistItem/:id", addWishlistItem);
router.get("/getallwishlistitems",getWishlistItem);
router.delete("/removeWishlistItem/:id",removeWishlistItem);
router.put("/lessoncompleted/:courseId", isLogin,updateLessonCompletedStatus);
router.get("/filtercourse",filterCourse);
router.post("/refreshtoken",createRefreshToken);
router.get('/getallcategory',getAllCategoryStudent)

//for chatImplementation
router.get("/getuserforsidebar",getUsersForSidebar);
router.post('/accesschat/:userId',isLogin, accessChat);


export default router;
