
import express from 'express';
const router = express.Router();
import { loginStudent,registerStudent,getStudentProfile,googleRegister,googleLogin,
         sendOTP,verifyOTP,resetPassword,getProfileById,updateProfile
        } from '../../Controller/StudentController/StudentController';
        
import { isLogin } from '../../../middleware/studentAuth';


router.post('/login', loginStudent);
router.post('/register', registerStudent);
router.post('/google/register',googleRegister)
router.post('/google/login',googleLogin)
//otp 
router.post("/send-otp",sendOTP)
router.post("/verify-otp",verifyOTP);
//Forget password & reset password;
router.post("/resetPassword",resetPassword);
router.get('/userprofile/:id',isLogin, getStudentProfile);//////////////////
//StudentEditProfile
router.get('/editprofile/:id',isLogin, getProfileById);
router.put('/updateprofile/:id',isLogin,updateProfile)

export default router;

