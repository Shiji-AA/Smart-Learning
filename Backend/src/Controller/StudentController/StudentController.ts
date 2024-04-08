import { Request, Response } from "express";
import studentModel, { Student } from "../../model/userModel";
import lessonModel from "../../model/lessonModel";
import courseModel,{Course} from "../../model/courseModel";
import generateToken from "../../../Utils/generateToken";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import orderModel from "../../model/orderModel";
import TutorModel from "../../model/tutorModel";
import wishlistModel ,{Wishlist }from "../../model/wishlistModel";
import WishlistModel from "../../model/wishlistModel";
import categoryModel from "../../model/categoryModel";


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
      const { token, refreshToken } = generateToken(user._id);   
      user.refreshToken = refreshToken;
      await user.save();   

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
        refreshToken,
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
        image : user.photo,
      };
      //generate Token & RefreshToken & save refreshToken in db
      const { token, refreshToken } = generateToken(user._id);
      user.refreshToken = refreshToken;
      await user.save();    

     return res.json({
        userData,
        token,
        refreshToken,
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
    const user =   (req as any).user   //from middleware   
    const userData = await studentModel.findOne({ _id: user._id});    
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
  const user =   (req as any).user 

  try{  
    const studentDetails = await studentModel.findById(user._id).exec();
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
      const user =   (req as any).user 
      console.log(user,"user") //from middleware
        
      const { studentName, studentEmail, phone } = req.body;
  
      const student = await studentModel.findById(user._id);
       
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
      //console.log(courseDetails,"iam COURSEDETAILS")
      if(courseDetails && courseDetails.length >0){
        res.status(200).json({courseDetails,message:"Course Details"})
      }
      else{
        return res.status(400).json({error:"no course available"})
      }

    }
    catch(error){
    console.log(error)
    }}
//getCourseDetails by Id
const getCourseDetails = async(req:Request,res:Response)=>{
try{
const courseId = req.params.id;
const courseDetails= await courseModel.findById(courseId);
if(courseDetails){
  res.status(200).json({courseDetails,message:"course details retrieved"})
}else{
  return res.status(404).json({error:"No course found"})
}
}
catch(error){
  console.log(error);
}}  
  
const enrolledcourses = async(req:Request,res:Response)=>{  
  try{   
    const enrolledCourses = await courseModel.find({ isEnrolled:true })  
    //console.log(enrolledCourses, "enrolled courses");
    res.status(200).json({enrolledCourses, message:"enrolledCourses"});
  }
  catch(error){
    console.log("error While Fetching EnrolledCourses", error);
    res.status(500).json({ error: "internal Server Error" });
  }
};

//for EnrolledSinglePageView
const enrolledcourseSingleview = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    const singleViewDetails = await courseModel.findOne({ _id:courseId }) 
    //console.log(singleViewDetails,"singleViewDetails")
    if (!singleViewDetails) {
      return res.status(404).json({ error: "No orders found for the course" });
    }
    res.status(200).json({singleViewDetails,message:"SingleCourseDetails"});
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//for EnrolledSinglePageView
const getAllLessons = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId; 
    const lessonDetails = await courseModel.findById(courseId).populate({      
       path: 'lessons' 
    });   
    if (!lessonDetails) {     
      return res.status(404).json({ error: "Lesson not found" });
    }
    //console.log(lessonDetails, "Lesson Details");
    res.status(200).json({ lessonDetails, message: "Lesson details fetched successfully" });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//for searching course from Home page
const searchCourse = async(req:Request,res:Response)=>{
  try {          
    const searchCriteria = req.query.searchCriteria;    
    if (!searchCriteria || typeof searchCriteria !== 'string') {
        return res.status(400).send('Invalid search criteria');
    }  
    const courseDetails = await courseModel.find({
        $and: [
            {courseName: { $regex: `^${searchCriteria}`, $options: 'i' } }, // Starts with 'a' search
               ]
    });  
    //console.log(courseDetails,"courseDetails");
    res.status(200).json(courseDetails); 
} catch (error:any) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
}
}

const tutorsList = async (req: Request, res: Response) => {
  try {
    const tutorDetails = await TutorModel.find().exec();
//console.log(tutorDetails,"tutordetails")
    if (tutorDetails.length > 0) {
      //console.log("Get all tutor details:", tutorDetails);
      res.status(200).json({
        tutorDetails,
        message: "Tutors found",
      });
    } else {
      return res.status(404).json({
        message: "No tutors found",
      });
    }
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const searchTutorStudent = async (req: Request, res: Response) => {
  try {
    const searchCriteria = req.query.searchCriteria;  
    if (!searchCriteria || typeof searchCriteria !== "string") {
      return res.status(400).send("Invalid search criteria");
    }
    const tutorDetails = await TutorModel.find({
      $and: [
        { tutorName: { $regex: `^${searchCriteria}`, $options: "i" } }, // Starts with 'a' search
        { tutorName: { $not: { $eq: "Admin" } } }, // Exclude records where name is 'admin' (case-insensitive)
      ],
    });
    res.status(200).json(tutorDetails); // Send the found tutors as a JSON response
  } catch (error:any) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};


const addWishlistItem = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    //console.log(id, "id"); // courseId    
    const existingItem = await wishlistModel.findOne({ course: id });
    if (existingItem) {
      // If the course already exists in the wishlist, send a message indicating that it's already added
      return res.status(400).json({ error: 'Course is already added to wishlist' });
    }
    // If the course doesn't exist in the wishlist, create a new wishlist item
    const newWishlistItem = new wishlistModel({ course: id, isWishlisted: true });
    await newWishlistItem.save();
    console.log(newWishlistItem, "New Wishlist Item");

    // Send success response
    res.status(201).json({ message: 'Course added to wishlist successfully', data: newWishlistItem });
  } catch (error) {
    console.error("Error adding course to wishlist:", error);
    // Send error response
    res.status(500).json({ message: 'Failed to add course to wishlist', error });
  }
};

const getWishlistItem = async(req:Request, res:Response)=>{
try{
  const wishlistedCourses = await WishlistModel.find().populate('course')
  //console.log(wishlistedCourses,"wishlistedCourses")
  res.status(200).json({ wishlistedCourses,message:"wishlistedCourses" });
} catch (error) {
  res.status(500).json({ message: 'Failed to fetch wishlist items', error });
}
}

const removeWishlistItem = async (req: Request, res: Response) => {
  const itemId = req.params.id; 
  try {  
    const deletedItem = await WishlistModel.findByIdAndDelete(itemId);
    if (!deletedItem) {    
      return res.status(404).json({ message: "Wishlist item not found" });
    }
    res.status(200).json({ message: "Wishlist item removed successfully", deletedItem });
  } catch (error) { 
    res.status(500).json({ message: "Failed to remove wishlist item", error });
  }
};

const getUsersForSidebar=async (req: Request, res: Response)=>{
  try{
    const allUsers = await studentModel.find({__v:{$ne:1}}).select("-password");
    res.status(200).json({allUsers,message:"allUsers"})
  }
  catch(error){
    console.log("error in getUsersForSidebar ",error)
    res.status(500).json({error:"Internal server error"})
  }
}
const updateLessonCompletedStatus = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    await courseModel.findByIdAndUpdate(courseId, { isLessonCompleted: true });
    res.status(200).json({ message: 'Lesson completion status updated successfully.' });
  } catch (error) {  
    console.error('Error updating lesson completion status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//FILTER COURSE
const filterCourse = async (req: Request, res: Response) => {
  try {
    let filteredCourses:any;
    if (req.query && req.query.category !== "All") {    
      const category = await categoryModel.findOne({ title: req.query.category });      
    if (!category) {
        filteredCourses = [];
      } else {
        filteredCourses = await courseModel.find({ category: category._id }).populate("category");
      }
    } else {     
      filteredCourses = await courseModel.find().populate("category");
    }
    //console.log(filteredCourses, "Filtered courses");
    res.status(200).json({ filteredCourses, message: "Filtered courses" });
  } catch (error) {
    console.error("Error filtering courses:", error);
    res.status(500).json({ error: "Internal server error" });
   }
    };

    
    const createRefreshToken = async (req: any, res: any) => {
        try {
            const { refreshToken } = req.body;
            console.log(refreshToken,"refresh Token")
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { _id: string };
            const user = await studentModel.findById(decoded?._id);
    
          
            if (!user || user.refreshToken !== refreshToken) {
                throw new Error('Invalid refresh token');
            }
    
            // Generate a new access token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '2d' });    
            return token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            res.status(401).json({ message: 'Failed to refresh token' });
        }
    };
    //get All Catagories

const getAllCategoryStudent = async (req: Request, res: Response) => {
  try {
    const categoryDetails = await categoryModel.find().exec();
    if (categoryDetails) {
      //console.log(categoryDetails,"Get all Category")

      res.status(200).json({
        categoryDetails,
        message:"categoryDetails"
      });
    } else {
      return res.status(400).json({
        message: "no users in this table",
      });
    }
  } catch (error) {
    console.error("Error while fetching category:", error);
    res.status(500).json({ error: "Internal server error" });  
  }
};
    

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
  getCourseDetails,
  enrolledcourses,
  enrolledcourseSingleview,
  getAllLessons,
  searchCourse,
  tutorsList,
  searchTutorStudent,
  addWishlistItem,
  getWishlistItem,
  removeWishlistItem,
  getUsersForSidebar,
  updateLessonCompletedStatus,
  filterCourse,
  createRefreshToken ,
  getAllCategoryStudent,
};
