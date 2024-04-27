"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
const AdminController_1 = require("../../Controller/AdminController/AdminController");
const AdminController_2 = require("../../Controller/AdminController/AdminController");
const AdminAddCategory_1 = __importDefault(require("../../Controller/AdminController/AdminAddCategory"));
const AdminController_3 = require("../../Controller/AdminController/AdminController");
const AdminController_4 = require("../../Controller/AdminController/AdminController");
const Admintutorcontroller_1 = require("../../Controller/AdminController/Admintutorcontroller");
const Adminstudentcontroller_1 = require("../../Controller/AdminController/Adminstudentcontroller");
const studentAuth_1 = require("../../../middleware/studentAuth");
const AdminDashboard_1 = require("../../Controller/AdminController/AdminDashboard");
adminRouter.post("/admin", AdminController_1.adminLogin);
adminRouter.post("/addcategory", studentAuth_1.isLogin, AdminAddCategory_1.default);
adminRouter.get("/getallcategory", studentAuth_1.isLogin, AdminController_2.getAllCategory);
adminRouter.get("/getallcategory1/:id", studentAuth_1.isLogin, AdminController_1.getCategoryById);
adminRouter.put("/editcategory/:id", studentAuth_1.isLogin, AdminController_3.editCategory);
adminRouter.delete("/deletecategory/:id", studentAuth_1.isLogin, AdminController_4.deleteCategory);
//Tutors listing
adminRouter.get("/getalltutors", studentAuth_1.isLogin, Admintutorcontroller_1.getAlltutors);
adminRouter.get("/searchtutor", studentAuth_1.isLogin, Admintutorcontroller_1.searchTutor);
adminRouter.post("/unlisttutor/:id", studentAuth_1.isLogin, Admintutorcontroller_1.unlistTutor);
adminRouter.post("/relisttutor/:id", studentAuth_1.isLogin, Admintutorcontroller_1.relistTutor);
adminRouter.get("/admincourselist", studentAuth_1.isLogin, AdminController_1.getAdminCourseList);
adminRouter.post("/toggleCourseStatus/:id", studentAuth_1.isLogin, AdminController_1.toggleCourseStatus);
//Students listing
adminRouter.get("/getallstudents", studentAuth_1.isLogin, Adminstudentcontroller_1.getAllstudents);
adminRouter.get("/searchstudent", studentAuth_1.isLogin, Adminstudentcontroller_1.searchStudent);
adminRouter.post("/unliststudent/:id", studentAuth_1.isLogin, Adminstudentcontroller_1.unlistStudent);
adminRouter.post("/reliststudent/:id", studentAuth_1.isLogin, Adminstudentcontroller_1.relistStudent);
//Dashboard
adminRouter.get('/totalcount', AdminDashboard_1.TotalSales);
adminRouter.get('/getnotifications', AdminDashboard_1.getNotification);
adminRouter.put('/marknotificationasread/:notificationId', AdminController_1.marknotificationasread);
exports.default = adminRouter;
