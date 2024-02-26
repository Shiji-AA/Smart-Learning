
import express from 'express';
const router = express.Router();
import { loginStudent,
         registerStudent,
         logoutStudent,
         getStudentProfile,
         updateStudentProfile }
         from '../../Controller/StudentController/StudentController';

router.post('/login', loginStudent);
router.post('/register', registerStudent);
//router.post('/logout', logoutStudent);
router.post('/logout/:id', logoutStudent);

router.get('/getProfile',  getStudentProfile);
router.put('/updateProfile',  updateStudentProfile);

export default router;

