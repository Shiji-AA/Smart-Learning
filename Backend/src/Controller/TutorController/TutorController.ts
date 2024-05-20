import { Request, Response } from "express";
import TutorModel, { TUTOR } from "../../model/tutorModel";
import generateToken from "../../../Utils/generateToken";
import courseModel, { Course } from "../../model/courseModel";
import categoryModel from "../../model/categoryModel";
import lessonModel from "../../model/lessonModel";
import orderModel from "../../model/orderModel";
import jwt from "jsonwebtoken";
import notificationModel from "../../model/notificationModel";
import mongoose from 'mongoose';
import errorHandler from "../../Constants/errorHandler";
import quizModel from "../../model/quizModel";
import chatModel from "../../model/chatModel";


const registerTutor = async (req: Request, res: Response) => {
  try {
    const { tutorName, tutorEmail, password,education,experience,onlineavailability, phone } = req.body;
    //console.log(req.body, "i am tutor");
    const tutorExist = await TutorModel.findOne({ tutorEmail: tutorEmail });
    const phoneExist = await TutorModel.findOne({ phone: phone });
    if (tutorExist || phoneExist) {
      return res.status(400).json({ error: "User Already Exist" });
    }
    const tutor = await TutorModel.create({
      tutorName,
      tutorEmail,
      password,
      education,
      experience,
      onlineavailability,
      phone,
    });
    if (tutor) {
      const tutorData = {
        tutorName: tutor.tutorName,
        tutorEmail: tutor.tutorEmail,
        phone: tutor.phone,
        education:tutor.education,
        experience:tutor.experience,
        onlineavailability:tutor.onlineavailability,
        tutorId: tutor._id,
      };
      return res.status(201).json({
        message: "Tutor Registered Successfully",
      });
    } else {
      return res.status(400).json({ error: "Invalid Tutor Details" });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const tutorLogin = async (req: Request, res: Response) => {
  const { tutorEmail, password } = req.body;
  try {
    const tutor = await TutorModel.findOne({ tutorEmail: tutorEmail });
    if (!tutor) {
      return res.status(400).json({ error: "No Tutor Found" });
    }
    if (tutor.isBlocked) {
      return res.status(401).json({ error: "User is blocked" });
    }
    if (tutor && (await tutor.matchPassword(password))) {
      //generate a jwt

      const tutorData = {
        tutorName: tutor.tutorName,
        tutorEmail: tutor.tutorEmail,
        phone: tutor.phone,
        tutorId: tutor._id,
        image: tutor.photo,
      };

      const { token, refreshToken } = generateToken(tutor._id);
      tutor.refreshToken = refreshToken;
      await tutor.save();    
 
      return res.status(200).json({
        tutorData,
        token,
        refreshToken,
        message: "Login Success",
      });
    } else {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const getTutorProfile = async (req: Request, res: Response) => {
  try {
    const tutor = (req as any).user;
    const tutorData = await TutorModel.findOne({ _id: tutor._id });
    //console.log(tutorData, "tutordata");
    if (!tutorData) {
      return res.status(404).json({ error: "Tutor not found" });
    }
    return res.status(200).json({ tutorData });
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const addCourse = async (req: Request, res: Response) => { 
  try {    
    const{courseName,courseDuration,courseDescription, courseFee,selectcategory,selecttutor,image} = req.body;
    const categoryExist = await categoryModel.findById(selectcategory);
    if (!categoryExist) {
      return res.status(400).json({ error: "Category does not exist" });
    }
    const courseExist: Course | null = await courseModel.findOne({
      courseName: { $regex: new RegExp("^" + courseName + "$", "i") }, // Match exact courseName
    });
    if (courseExist) {
      return res.status(400).json({ error: "Course already exists" });
    }
    const newCourse = await courseModel.create({
      courseName,courseDuration,courseDescription,courseFee,category: selectcategory,tutor: selecttutor,photo: image,
    });
    if (newCourse) {
//Creating a notification to admin
      const notification = await notificationModel.create({
        senderUser: (req as any).user , 
        receiverUser: new mongoose.Types.ObjectId("65e6adc6193904154dc390e8"), 
        message: `New course : '${courseName}' has been added`, 
        type: 'Pending for Approval',
        isRead: false,
    });
      return res.status(201).json({courseName,courseDescription,courseFee,courseDuration,selectcategory,selecttutor,image,
        message: "Course added successfully",
      });
    } else {
      return res.status(400).json({
        error: "Invalid course data",
      });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};




//to get data in the edit course page
const editCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const courseDetails = await courseModel.findById(courseId).exec();
    if (courseDetails) {
      res.status(200).json({
        courseDetails,
        message: "courseDetails found successfully",
      });
    } else {
      return res.status(404).json({
        message: "Course not found",
      });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const updateCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const updatedCourseData = req.body;
    //console.log(updatedCourseData, "updated data");
    const course = await courseModel.findByIdAndUpdate(
      courseId,
      { $set: updatedCourseData },
      { new: true }
    );
    if (course) {
      res.status(200).json({
        course,
        message: "Course Updated Successfully",
      });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const getAllCourse = async (req: Request, res: Response) => {
  try {
    const tutor = req.params.tutorId;
    console.log(tutor, "tutorId");
    const courseDetails = await courseModel.find({ tutor: tutor }).exec();
    console.log(courseDetails, "courseDetails");
    
    if (!courseDetails.length) {
      return res.status(400).json({
        error: "No course available "
      });
    } else {
      return res.status(200).json({
        courseDetails,
        message: "courseDetails"
      });
    }
  } catch (error) {
    return errorHandler(res, error);
  }
};


const singleView = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const courseDetails = await courseModel.findById(courseId);
    if (courseDetails) {
      res.status(200).json({
        courseDetails,
        message: "Course details retrieved",
      });
    } else {
      return res.status(400).json({
        error: "No course available ",
      });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const addLesson = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      selectcategory,
      selectcourse,
      video,
    } = req.body;
    const categoryExist = await categoryModel.findById(selectcategory);
    if (!categoryExist) {
      return res.status(400).json({ error: "Category does not exist" });
    }
    const courseExist = await courseModel.findById(selectcourse);
    if (!courseExist) {
      return res.status(400).json({ error: "Course does not exist" });
    }
    const newLesson = await lessonModel.create({
      title,
      description,
      categoryId: selectcategory,
      courseId: selectcourse,
      video,
    });
    await courseModel.findByIdAndUpdate(selectcourse, {
      $push: { lessons: newLesson._id },
    });
    if (newLesson) {
      return res.status(201).json({
        title,
        description,
        selectcategory,
        selectcourse,
        video,
        message: "Lesson added successfully",
      });
    } else {
      return res.status(400).json({
        error: "Failed to add lesson. Please check your data.",
      });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

//to get data in the editprofile page
const getProfileById = async (req: Request, res: Response) => {
  const tutor = (req as any).user;
  console.log(tutor, "tutor");
  try {
    const tutorDetails = await TutorModel.findById(tutor._id).exec();
    if (tutorDetails) {
      res.status(200).json({
        tutorDetails,
        message: "Tutor found successfully",
      });
    } else {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const tutor1 = (req as any).user;  
    const { tutorName, tutorEmail, phone ,education,experience,onlineavailability,photo} = req.body;
    const tutor = await TutorModel.findById(tutor1._id);
    if (!tutor) {
      return res.status(404).json({ error: "Invalid category" });
    }
    tutor.tutorName = tutorName || tutor.tutorName;
    tutor.tutorEmail = tutorEmail || tutor.tutorEmail;
    tutor.phone = phone || tutor.phone;
    tutor.education = education || tutor.education;
    tutor.experience = experience || tutor.experience;
    tutor.onlineavailability = onlineavailability || tutor.onlineavailability;
    tutor.photo =  photo

    const updateTutorData = await tutor.save();
    //this is  sending along with response so that update the store
    const tutorData = {
      tutorName: updateTutorData.tutorName,
      tutorEmail: updateTutorData.tutorEmail,
      phone: updateTutorData.phone,
      education:updateTutorData.education,
      experience:updateTutorData.experience,
      onlineavailability:updateTutorData.onlineavailability,
      image: updateTutorData.photo,
      tutorId: updateTutorData._id,
    };
    if (updateTutorData) {
      return res
        .status(200)
        .json({ tutorData, message: "Tutor updated successfully" });
    } else {
      return res.status(404).json({ error: "Failed to update tutor" });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

const tutorAllLessons = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    // Fetch course details
    const courseDetails = await courseModel.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({ error: "Course not found" });
    }
    // Fetch lesson details associated with the course
    const lessonIds = courseDetails.lessons;
    const lessonDetails = await lessonModel.find({ _id: { $in: lessonIds } });
    //console.log(lessonDetails, "Lesson Details");

    // Send response with lesson details
    res.status(200).json({ lessonDetails, message: "lessonDetails" });
  } catch (error) {
    return errorHandler(res,error); 
  }
};

//to fetch the data to editLessonPage
const editLesson = async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    const lessonDetails = await lessonModel.findById(lessonId);
    if (lessonDetails) {
      return res
        .status(200)
        .send({ lessonDetails, message: "lessonDetails are found" });
    } else {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

//To update the lesson

const updateLesson = async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    const updatedLessonData = req.body;
    //console.log(lessonId,"lessonId");
    const newLessonData = await lessonModel.findByIdAndUpdate(
      lessonId,
      { $set: updatedLessonData },
      { new: true }
    );
    if (newLessonData) {
      res
        .status(200)
        .json({ newLessonData, message: "Lesson updated successfully" });
    } else {
      res.status(404).json({ error: "Lesson not found" });
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};
//for getting enrolled student Details
const enrolledStudentData = async (req: Request, res: Response) => {
  const tutor = (req as any).user
  console.log(tutor,"Tutor")
  try {
    const tutorId = tutor._id;  
    //console.log(tutorId);
    const enrolledStudentDetails = await orderModel
      .find({ tutorId: tutorId })
      .populate("studentId")
      .populate("courseId")
      .exec();
    //console.log(enrolledStudentDetails, "enrolledStudentDetails");
    res.status(200).json({ enrolledStudentDetails, message: "enrolledStudentDetails" });
  } catch (error) {
    return errorHandler(res,error); 
  }
};

  
const createRefreshToken = async (req: any, res: any) => {
  try {
      const { refreshToken } = req.body;
      console.log(refreshToken,"refresh Token")
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { _id: string };
      const tutor = await TutorModel.findById(decoded?._id);    
      if (!tutor || tutor.refreshToken !== refreshToken) {
          throw new Error('Invalid refresh token');
      }
      // Generate a new access token
      const token = jwt.sign({ _id: tutor._id }, process.env.JWT_SECRET as string, { expiresIn: '3d' });    
      return token;
  } catch (error) {
    return errorHandler(res,error); 
  }
};
const addQuiz = async (req: any, res: any) => {
  const { questionset, courseId, count } = req.body;
  //console.log(req.body,"req.body");

  try {
    const existQuiz = await quizModel.find({ courseId: courseId });

    if (existQuiz.length === 0) {
      // If no quiz exists for the course, create a new one
      const newQuiz = await quizModel.create({
        courseId: courseId,
        questionset,
      });

      // Update the course document with the number of quiz questions
      await courseModel.findByIdAndUpdate(courseId, { quizQuestions: count });

      res.status(201).json({newQuiz,message:"new quiz  added"});
    } else {
      // If a quiz already exists for the course, update the existing quiz
      const numberOfQuestionSets = existQuiz[0].questionset.length;
      const updateQuizSet = await quizModel.findOneAndUpdate(
        { courseId: courseId },
        { $push: { questionset: { $each: questionset } } },
        { new: true }
      );
      // Update the course document with the new number of quiz questions
      await courseModel.findByIdAndUpdate(courseId, { quizQuestions: numberOfQuestionSets });
      res.status(201).json(updateQuizSet);
    }
  } catch (error) {
    return errorHandler(res,error);    
  }
};


const activateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await quizModel.findOneAndUpdate(
      { "questionset._id": id },
      { $set: { "questionset.$.isActive": true } },
      { new: true }
    );
    if (quiz) {
      res.status(201).json({
        _id: quiz._id,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const removeQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await quizModel.findOneAndUpdate(
      { "questionset._id": id },
      { $set: { "questionset.$.isActive": false } },
      { new: true }
    );

    if (quiz) {
      res.status(201).json({
        _id: quiz._id,
      });
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllQuestions = async(req: Request, res: Response)=>{
  try{
    const questionDetails = await quizModel.find()
    res.status(200).json({message:"questionDetails",questionDetails})
  }
  catch(error){
    return errorHandler(res,error);
  }}

  //fetch all chats to a particular Tutor
  const fetchChats = async (req: Request, res: Response) => {  
    try {
        const { id } = req.params; //studentId
       // console.log(id, "StudentId")
        const senderId = (req as any).user?._id; //tutorId   
        //console.log(id, senderId,"jjj")
        const chat = await chatModel.findOne({
            participants: { $all: [senderId, id] },
        }).populate("messages"); 
        if (!chat) {return res.status(200).json([])};
        //console.log(chat?.messages, "chat")
        const messageData = chat.messages
        //console.log(messageData,"messageData")
        res.status(200).json({messageData,message:"ChatMessages"});
    } catch (error) {
        console.error("Error in fetchChats:", error);
        res.status(500).json({ error, message: "Error while fetching messages" });
    }
  };

  //FILTER COURSE
const filterCourseTutor = async (req: Request, res: Response) => {
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
    return errorHandler(res,error); 
   }
    };

export {
  tutorLogin,
  registerTutor,
  getTutorProfile,
  addCourse,
  getAllCourse,
  addLesson,
  singleView,
  getProfileById,
  updateProfile,
  editCourse,
  updateCourse,
  editLesson,
  updateLesson,
  tutorAllLessons,
  enrolledStudentData,
  createRefreshToken,
  addQuiz,
  activateQuiz,
  removeQuiz,
  getAllQuestions,
  fetchChats ,
  filterCourseTutor
};
