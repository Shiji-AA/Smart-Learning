
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
tutorRouter.get('/tutorprofile/:tutorId',isLogin,getTutorProfile)
tutorRouter.post('/addcourse',addCourse);
tutorRouter.get('/getallcourse',getAllCourse);
tutorRouter.get('/categories' , getAllCategory);
tutorRouter.post('/addlesson',addLesson);
tutorRouter.get('/singleview' , singleView);
tutorRouter.get('/getallcourse/:id',singleView);
//TutorEditProfile
tutorRouter.get('/tutoreditprofile/:tutorId', getProfileById);
tutorRouter.put('/tutorupdateprofile/:tutorId',updateProfile)


export default tutorRouter;
