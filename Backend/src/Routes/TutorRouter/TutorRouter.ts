import express from 'express';
const tutorRouter =express.Router();

import{
tutorLogin,
registerTutor,
getTutorProfile,
addCourse,
getAllCourse,
addLesson,
singleView
} from '../../Controller/TutorController/TutorController'
import { getAllCategory } from '../../Controller/AdminController/AdminController';


tutorRouter.post('/tutorLogin',tutorLogin)
tutorRouter.post('/tutorregister',registerTutor)
tutorRouter.get('/tutorprofile/:tutorId',getTutorProfile)
tutorRouter.post('/addcourse',addCourse);
tutorRouter.get('/getallcourse',getAllCourse);
tutorRouter.get('/categories' , getAllCategory);
tutorRouter.post('/addlesson',addLesson);
tutorRouter.get('/singleview' , singleView);
tutorRouter.get('/getallcourse/:id',singleView);


export default tutorRouter;
