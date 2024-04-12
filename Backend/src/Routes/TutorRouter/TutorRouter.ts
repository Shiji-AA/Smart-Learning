import express from "express";
const tutorRouter = express.Router();

import {
  tutorLogin,
  registerTutor,
  getTutorProfile,
  addCourse,
  getAllCourse,
  addLesson,
  singleView,
  getProfileById,
  updateProfile,
  editCourse,
  updateCourse,
  editLesson,
  updateLesson,
  tutorAllLessons,
  enrolledStudentData,
} from "../../Controller/TutorController/TutorController";
import { getAllCategory } from "../../Controller/AdminController/AdminController";
import { isLogin } from "../../../middleware/studentAuth";
import { createRefreshToken } from "../../Controller/TutorController/TutorController";

tutorRouter.post("/tutorLogin", tutorLogin);
tutorRouter.post("/tutorregister", registerTutor);
tutorRouter.get("/tutorprofile", isLogin, getTutorProfile);
tutorRouter.post("/addcourse", isLogin, addCourse);

tutorRouter.get("/editcourse/:id", editCourse);
tutorRouter.put("/updatecourse/:id", updateCourse);

tutorRouter.get("/getallcourse", isLogin, getAllCourse);
tutorRouter.get("/categories", isLogin, getAllCategory);
tutorRouter.post("/addlesson", isLogin, addLesson);

tutorRouter.get("/editlesson/:id", editLesson);
tutorRouter.put("/updatelesson/:id", updateLesson);

tutorRouter.get("/singleview", isLogin, singleView);
tutorRouter.get("/getallcourse/:id", isLogin, singleView);
//TutorEditProfile
tutorRouter.get("/tutoreditprofile", isLogin, getProfileById);
tutorRouter.put("/tutorupdateprofile", isLogin, updateProfile);
tutorRouter.get("/tutoralllessons/:id", isLogin,tutorAllLessons);
tutorRouter.get("/enrolledstudentdetails",isLogin, enrolledStudentData);
tutorRouter.post("/refreshtoken",createRefreshToken);

export default tutorRouter;
