"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const StudentController_1 = require("../../Controller/StudentController/StudentController");
const studentAuth_1 = require("../../../middleware/studentAuth");
const ChatController_1 = require("../../Controller/ChatController/ChatController");
router.post("/login", StudentController_1.loginStudent);
router.post("/register", StudentController_1.registerStudent);
router.post("/google/register", StudentController_1.googleRegister);
router.post("/google/login", StudentController_1.googleLogin);
//otp
router.post("/send-otp", StudentController_1.sendOTP);
router.post("/verify-otp", StudentController_1.verifyOTP);
//Forget password & reset password;
router.post("/resetPassword", StudentController_1.resetPassword);
router.get("/userprofile", studentAuth_1.isLogin, StudentController_1.getStudentProfile);
//StudentEditProfile
router.get("/editprofile", studentAuth_1.isLogin, StudentController_1.getProfileById);
router.put("/updateprofile", studentAuth_1.isLogin, StudentController_1.updateProfile);
router.get("/usercourselist", studentAuth_1.isLogin, StudentController_1.userCourseList);
//StudentCoursePurchase
router.get("/coursedetail/:id", studentAuth_1.isLogin, StudentController_1.getCourseDetails);
router.get("/checkout/:id", studentAuth_1.isLogin, StudentController_1.getCourseDetails);
router.get("/enrolledcourses", studentAuth_1.isLogin, StudentController_1.enrolledcourses);
router.get("/enrolledcourseSingleview/:courseId", StudentController_1.enrolledcourseSingleview);
router.get("/postenrollmentcourseview/:courseId", StudentController_1.enrolledcourseSingleview);
router.get("/getalllessons/:courseId", studentAuth_1.isLogin, StudentController_1.getAllLessons); //enrolled
router.get("/searchcourse", StudentController_1.searchCourse);
router.get("/tutorslist", studentAuth_1.isLogin, StudentController_1.tutorsList);
router.get("/searchTutor", StudentController_1.searchTutorStudent);
router.post("/addWishlistItem/:id", StudentController_1.addWishlistItem);
router.get("/getallwishlistitems", StudentController_1.getWishlistItem);
router.delete("/removeWishlistItem/:id", StudentController_1.removeWishlistItem);
router.put("/lessoncompleted/:courseId", studentAuth_1.isLogin, StudentController_1.updateLessonCompletedStatus);
router.get("/filtercourse", StudentController_1.filterCourse);
router.post("/refreshtoken", StudentController_1.createRefreshToken);
router.get('/getallcategory', StudentController_1.getAllCategoryStudent);
router.get('/quizList/:courseId', StudentController_1.quizList);
router.post('/courserating', studentAuth_1.isLogin, StudentController_1.courseRating);
router.get('/getallratings/:courseId', studentAuth_1.isLogin, StudentController_1.getAllRatings);
router.get('/getMyRating/:courseId', studentAuth_1.isLogin, StudentController_1.getMyRating);
router.get('/getallratings1', studentAuth_1.isLogin, StudentController_1.getAllRatings1); //clientsOpinion page
//for chatImplementation
router.get("/getuserforsidebar", StudentController_1.getUsersForSidebar);
router.post('/accesschat/:userId', studentAuth_1.isLogin, ChatController_1.accessChat);
router.get('/fetchchats/:id', studentAuth_1.isLogin, StudentController_1.fetchChatss);
exports.default = router;
