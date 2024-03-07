import express from 'express';
const adminRouter =express.Router();

import {adminLogin,getAdminCourseList,getCategoryById,toggleCourseStatus} from '../../Controller/AdminController/AdminController';
import { getAllCategory } from '../../Controller/AdminController/AdminController';
import addCategory from '../../Controller/AdminController/AdminAddCategory';
import { editCategory } from '../../Controller/AdminController/AdminController';
import { deleteCategory } from '../../Controller/AdminController/AdminController';
import { getAlltutors, relistTutor, searchTutor, unlistTutor } from '../../Controller/AdminController/Admintutorcontroller';
import { getAllstudents, relistStudent, searchStudent, unlistStudent } from '../../Controller/AdminController/Adminstudentcontroller';

adminRouter.post('/admin',adminLogin);
adminRouter.post('/addcategory',addCategory);
adminRouter.get('/getallcategory',getAllCategory);
adminRouter.get('/getallcategory1/:id',getCategoryById);
adminRouter.put('/editcategory/:id', editCategory);
adminRouter.delete('/deletecategory/:id',deleteCategory)
//Tutors listing
adminRouter.get('/getalltutors',getAlltutors);
adminRouter.get('/searchtutor',searchTutor)
adminRouter.post('/unlisttutor/:id',unlistTutor);
adminRouter.post('/relisttutor/:id',relistTutor);

adminRouter.get('/admincourselist',getAdminCourseList);
adminRouter.post('/toggleCourseStatus/:id',toggleCourseStatus)
//Students listing
adminRouter.get('/getallstudents',getAllstudents)
adminRouter.get('/searchstudent',searchStudent)
adminRouter.post('/unliststudent/:id',unlistStudent);
adminRouter.post('/reliststudent/:id',relistStudent);

export default adminRouter;
