import express from "express";
const adminRouter = express.Router();

import {
  adminLogin,
  getAdminCourseList,
  getCategoryById,
  toggleCourseStatus,
} from "../../Controller/AdminController/AdminController";
import { getAllCategory } from "../../Controller/AdminController/AdminController";
import addCategory from "../../Controller/AdminController/AdminAddCategory";
import { editCategory } from "../../Controller/AdminController/AdminController";
import { deleteCategory } from "../../Controller/AdminController/AdminController";
import {
  getAlltutors,
  relistTutor,
  searchTutor,
  unlistTutor,
} from "../../Controller/AdminController/Admintutorcontroller";
import {
  getAllstudents,
  relistStudent,
  searchStudent,
  unlistStudent,
} from "../../Controller/AdminController/Adminstudentcontroller";

import { isLogin } from "../../../middleware/studentAuth";

adminRouter.post("/admin", adminLogin);
adminRouter.post("/addcategory", isLogin, addCategory);
adminRouter.get("/getallcategory", isLogin, getAllCategory);
adminRouter.get("/getallcategory1/:id", isLogin, getCategoryById);
adminRouter.put("/editcategory/:id", isLogin, editCategory);
adminRouter.delete("/deletecategory/:id", isLogin, deleteCategory);
//Tutors listing
adminRouter.get("/getalltutors", isLogin, getAlltutors);
adminRouter.get("/searchtutor", isLogin, searchTutor);
adminRouter.post("/unlisttutor/:id", isLogin, unlistTutor);
adminRouter.post("/relisttutor/:id", isLogin, relistTutor);

adminRouter.get("/admincourselist", isLogin, getAdminCourseList);
adminRouter.post("/toggleCourseStatus/:id", isLogin, toggleCourseStatus);
//Students listing
adminRouter.get("/getallstudents", isLogin, getAllstudents);
adminRouter.get("/searchstudent", isLogin, searchStudent);
adminRouter.post("/unliststudent/:id", isLogin, unlistStudent);
adminRouter.post("/reliststudent/:id", isLogin, relistStudent);

export default adminRouter;
