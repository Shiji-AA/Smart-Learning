import { Request, Response } from "express";
import studentModel, { Student } from "../../model/userModel";
import courseModel,{Course} from "../../model/courseModel";
import generateToken from "../../../Utils/generateToken";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';


interface DecodedData {
  name: string;
  email: string;
  picture: string;
  jti: string;
}

const globalData = {
  user: null as null | {
    studentName: string;
    studentEmail: string;
    phone: string;
  },
};

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
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    if (userphone) {
      return res
        .status(400)
        .json({ error: "User with this phone number already exists" });
    }

    const newUser: Student = new studentModel({
      studentName: name,
      studentEmail: email,
      phone,
      password,
    });

    await newUser.save();

    // Store user information in globalData if registration is successful
    globalData.user = {
      studentName: name,
      studentEmail: email,
      phone,
    };

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

//googleREGISTER

const googleRegister = async (req: Request, res: Response) => {
  try {
    console.log("This is credential in body: ", req.body.credential);
    const token = req.body.credential;
    const decodedData = jwt.decode(req.body.credential);

    console.log("Decoded data: ", decodedData);

    // Assuming decodedData is of type 'string | JwtPayload | null'
    const {
      name,
      email,
      picture,
      jti,
    }: DecodedData = decodedData as DecodedData;
    const user = await studentModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new studentModel({
      studentName: name,
      studentEmail: email,
      photo: picture,
      password: jti,
    });
    await newUser.save();
    res.status(200).json({ message: "user saved successfully" });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

//googleLogin
const googleLogin = async (req: Request, res: Response) => {
  try {
    const decodedData = jwt.decode(req.body.credential) as DecodedData | null;

    if (!decodedData) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const { name, email, picture, jti } = decodedData;
    const user = await studentModel.findOne({ studentEmail: email });

    if (user) {
      const token = generateToken(user._id);

      const userData = {
        name: user.studentName,
        email: user.studentEmail,
        id: user._id,
        phone: user.phone,
        image:user.photo,     
        role : user.studentRole
      };

      return res.json({
        userData,
        token,
        message: "Success",
      });
    } else {
      return res.status(401).json({ error: "Invalid Email and Password" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// @desc LOGIN student/setToken
// route POST /api/student/login
// access Public

const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //console.log(req.body);

    const user: Student | null = await studentModel.findOne({
      studentEmail: email,
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid user " });
    }
    if (user.isBlocked) {
      return res.status(401).json({ error: "User is blocked" });
    }

    if (user && (await user.matchPassword(password))) {
      const userData = {
        name: user.studentName,
        email: user.studentEmail,
        id: user._id,
        phone: user.phone,
        image : user.photo

      };

      //generate Token
      const token = generateToken(user._id);
      //console.log(token);
      return res.json({
        userData,
        token,
        message: "success",
      });
    } else {
      return res.status(401).json({ error: "Invalid Email and Password" });
    }
  } catch (error) {
    res.status(500).json({ error: "server Error " });
  }
};

//SENT OTP BUTTON
var otpCode: any;
const sendOTP = async (req: Request, res: Response) => {
  try {
     let email = req.body.email;
    otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "shijihcl@gmail.com",
        pass: "tsqb ondk qqqb zgia",
      },
    });

    const mailOptions = {
      from: "shijihcl@gmail.com",
      to: email,
      subject: "Verification Code",
      text: `Your OTP code is: ${otpCode}`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error("Error sending email: ", err);
        return res.status(500).json({ message: "Failed to send OTP email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ email,message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send OTP email" });
  }
};

//verify Button
var verified;
const verifyOTP = async (req: Request, res: Response) => {
  verified = false;
  try {
    const enteredOTP = req.body.otp;
    if (enteredOTP == otpCode) {
      verified = true;
      res.status(200).json({message:"Success"});
    } else {
      res.status(404).json({error:"Invalid OTP"});
    }
  } catch (error) {
    res.status(500).json({error:"Oops! Something went wrong!"});
  }
};

//reset password

const resetPassword = async (req: Request, res: Response) => { 

  try {
    const {newpassword, confirmpassword , email} = req.body;
    // You can directly use the `email` variable here
    const user = await studentModel.findOne({
      studentEmail: email,
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }
    if (newpassword !== confirmpassword) {
      return res.status(400).json({ error: "New password and confirm password do not match" });
    }
    if(user){
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      await studentModel.findOneAndUpdate({ studentEmail: email }, { password: hashedPassword });
  
      // Clear the OTP code after resetting the password
      otpCode = undefined;

    }  
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to reset password" });
  }
}

//to get student profile

const getStudentProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = await studentModel.findOne({ _id: id });    
    if (!userData) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//to get data in the editprofile page
const getProfileById =async (req:Request,res:Response)=>{
  const studentId=req.params.id;
  try{
  
    const studentDetails = await studentModel.findById(studentId).exec();
    if (studentDetails) {
      res.status(200).json({
        studentDetails,
        message: "Student found successfully",
      });
    } else {
      return res.status(404).json({
        message: "Student not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }

  }


  const updateProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;       
      const { studentName, studentEmail, phone } = req.body;
  
      const student = await studentModel.findById(id);
       
      if (!student) {
        return res.status(404).json({ error: "Invalid category" });
      }
  
      student.studentName = studentName || student.studentName;
      student.studentEmail = studentEmail || student.studentEmail;
      student.phone = phone || student.phone;
  
      const updateStudentData = await student.save();
      //updating store 
      const userData = {
        name: updateStudentData.studentName,
        email: updateStudentData.studentEmail,
        id: updateStudentData._id,
        phone: updateStudentData.phone,
        image:updateStudentData.photo,
        //photo : updateStudentData.photo,
        role : updateStudentData.studentRole
      };
      console.log(updateStudentData)
  
      if (updateStudentData) {
        return res.status(200).json({  userData,message: "Student updated successfully" });
      } else {
        return res.status(404).json({ error: "Failed to update student" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  const userCourseList = async(req:Request,res:Response)=>{
    try{
      const courseDetails= await courseModel.find({isApproved:true}).exec();
      console.log(courseDetails,"iam COURSEDETAILS")
      if(courseDetails && courseDetails.length >0){
        res.status(200).json({courseDetails,message:"Course Details"})
      }
      else{
        return res.status(400).json({error:"no course available"})
      }

    }
    catch(error){
console.log(error)
    }
  }
  
export {
  loginStudent,
  registerStudent,
  getStudentProfile, 
  googleRegister,
  googleLogin,
  sendOTP,
  verifyOTP,
  resetPassword,
  getProfileById,
  updateProfile,
  userCourseList,
};
