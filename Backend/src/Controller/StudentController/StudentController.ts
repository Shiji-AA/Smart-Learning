
import { Request, Response } from "express";
import studentModel from "../../model/userModel";
import generateToken from "../../../Utils/generateToken";


const globalData = {  
    user: null as null | {
      studentName: string;
      studentEmail: string;
      phone: string;
      password: string;
  }, };
  



// @desc Register A new user
//route POST /api/users
//access  Public


const registerStudent = async (req: Request, res: Response) => {
    try {
      const { studentName, studentEmail, password, phone } = req.body;
      console.log(req.body);
  
      if (!studentName || !studentEmail || !password || !phone) {
        return res.status(400).json({ message: "All Field Required" });
      }
  
      const userExist = await studentModel.findOne({ studentEmail });
      console.log(userExist, "I am exist");
      const userphone = await studentModel.findOne({ phone });
  
      if (userExist) {
        return res.status(400).json({
          message: "User Email Already Exist",
        });
      } else if (userphone) {
        return res.status(400).json({
          message: "Phone Number Already Exist",
        });
      }
  
      const user = {
        studentName,
        studentEmail,
        phone,
        password,
      };
  
      globalData.user = user;
 
} catch (error) {
 console.error(error);
 return res.status(500).json({ message: "An error occurred" });
}
}; 



// @desc LOGIN student/setToken
// route POST /api/student/login
// access Public
//
// const loginStudent = (req: Request, res: Response) => {
//     res.status(200).json({ message: "loginStudent" });
// };
//

const loginStudent = async (req: Request, res: Response) => {
    try {
      const { studentEmail, password } = req.body;
      console.log(req.body);
  
      const user = await studentModel.findOne({ studentEmail });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid user " });
      }
      if (user?.isBlocked === true) {
        return res.status(401).json({ message: "User is Blocked" });
      }
  
      if (user && (await user.matchPassword(password))) {
        //generate Token
        const token = generateToken(user._id);
        console.log(token);
  
        return res.json({
          user,
          token
        });
      } else {
        return res.status(401).json({ message: "Invalid Email and Password" });
      }
    } catch (error) {
      res.status(500).json({ message: "server Error " });
    }
  };



const logoutStudent = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user = await studentModel.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "User Not Found" });
      } else {
        await user.save();
        res.status(200).json({ message: "user Logout Successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  

//
const getStudentProfile = (req: Request, res: Response) => {
    res.status(200).json({ message: "getStudentProfile" });
};

//
const updateStudentProfile = (req: Request, res: Response) => {
    res.status(200).json({ message: "updateStudentProfile" });
};
export {
    loginStudent,
    registerStudent,
    logoutStudent,
    getStudentProfile,
    updateStudentProfile
};
