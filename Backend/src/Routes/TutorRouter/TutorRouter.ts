
import express from 'express';
const tutorRouter =express.Router();

import{
tutorLogin,
registerTutor,
getTutorProfile,
addCourse,
getAllCourse,
addLesson,
singleView,
getProfileById,
updateProfile ,
} from '../../Controller/TutorController/TutorController'
import { getAllCategory } from '../../Controller/AdminController/AdminController';
import { isLogin } from '../../../middleware/studentAuth';



tutorRouter.post('/tutorLogin',tutorLogin)
tutorRouter.post('/tutorregister',registerTutor)
tutorRouter.get('/tutorprofile',isLogin,getTutorProfile)
tutorRouter.post('/addcourse',isLogin,addCourse);
tutorRouter.get('/getallcourse',isLogin,getAllCourse);
tutorRouter.get('/categories' ,isLogin, getAllCategory);
tutorRouter.post('/addlesson',isLogin,addLesson);
tutorRouter.get('/singleview' ,isLogin, singleView);
tutorRouter.get('/getallcourse/:id',isLogin,singleView);
//TutorEditProfile
tutorRouter.get('/tutoreditprofile', isLogin,getProfileById);
tutorRouter.put('/tutorupdateprofile',isLogin,updateProfile)


export default tutorRouter;
