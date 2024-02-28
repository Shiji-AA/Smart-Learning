import express from 'express';
const tutorRouter =express.Router();

import{
tutorLogin,
    
} from '../../Controller/TutorController/TutorController'
tutorRouter.post('/adminlogin',tutorLogin)

export default tutorRouter;
