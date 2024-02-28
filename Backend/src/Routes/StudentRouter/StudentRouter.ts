
import express from 'express';
const router = express.Router();
import { loginStudent,
         registerStudent,
         logoutStudent,
         getStudentProfile,
         updateStudentProfile, 
         googleRegister,
         googleLogin,
         sendOTP,
         verifyOTP,        
         resetPassword
        }
         from '../../Controller/StudentController/StudentController';

router.post('/login', loginStudent);
router.post('/register', registerStudent);
router.post('/google/register',googleRegister)
router.post('/google/login',googleLogin)
//otp 
router.post("/send-otp",sendOTP)
router.post("/verify-otp",verifyOTP);
//Forget password & reset password;

router.post("/resetPassword",resetPassword);

//router.post('/logout/:id', logoutStudent);
router.get('/userprofile/:id',  getStudentProfile);
router.put('/editProfile',  updateStudentProfile);

export default router;

