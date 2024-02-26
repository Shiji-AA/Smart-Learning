
import { Request, Response } from "express";
//import studentModel from "../../model/userModel";
import studentModel, { Student } from "../../model/userModel";
import generateToken from "../../../Utils/generateToken";



const globalData = {  
    user: null as null | {
      studentName: string;
      studentEmail: string;
      phone: string;
      
  }, }; 
  
// @desc Register A new user
//route POST /api/users
//access  Public


const registerStudent = async (req: Request, res: Response) => {
  try {
      const { name, email, password, phone } = req.body;    
      //console.log("body data",req.body)

      const userExist = await studentModel.findOne({ email });
      const userphone = await studentModel.findOne({ phone });

      if (userExist) {
          return res.status(400).json({ error: "User with this email already exists" });
      }

      if (userphone) {
          return res.status(400).json({ error: "User with this phone number already exists" });
      }

      const newUser: Student = new studentModel({
          studentName:name,
          studentEmail:email,
          phone,
          password
      });

      await newUser.save();

      // Store user information in globalData if registration is successful
      globalData.user = {
          studentName:name,
          studentEmail:email,
          phone,
        };

      return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred" });
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
      const { email, password } = req.body;
      console.log(req.body);

      const user: Student | null = await studentModel.findOne({ studentEmail:email });
  
      if (!user) {
        return res.status(401).json({ error: "Invalid user " });
      }
      if (user.isBlocked) {
        return res.status(401).json({ error: "User is blocked" });
    }
  
      if (user && (await user.matchPassword(password))) {

        const userData = {
          name : user.studentName,
          email : user.studentEmail,
          id : user._id,
          phone : user.phone
        }

        //generate Token
        const token = generateToken(user._id);
        //console.log(token);  
        return res.json({
          userData,
          token,
          message:"success"
        });
      } else {
        return res.status(401).json({ error: "Invalid Email and Password" });
      }
    } catch (error) {
      res.status(500).json({ message: "server Error " });
    }
  };



const logoutStudent = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      console.log(req.params,"userId is")
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
