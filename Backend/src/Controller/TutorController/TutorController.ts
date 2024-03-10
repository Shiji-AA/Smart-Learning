import { Request, Response } from "express";
import TutorModel, { TUTOR } from "../../model/tutorModel";
import generateToken from "../../../Utils/generateToken";
import courseModel,{Course} from "../../model/courseModel";
import categoryModel from "../../model/categoryModel";
import lessonModel from "../../model/lessonModel";



  const registerTutor = async(req:Request,res:Response)=>{
    try {
      const {tutorName,tutorEmail,password,phone}=req.body;

      console.log(req.body,"i am tutor")

      const tutorExist =await TutorModel.findOne({tutorEmail:tutorEmail})
      
      const phoneExist =await TutorModel.findOne({phone:phone})

      if(tutorExist || phoneExist){
          
        return res.status(400).json({error:"User Already Exist"})
      }
      const tutor = await TutorModel.create({
          tutorName,
          tutorEmail,
          password,
          phone          
        })  
      if(tutor){
        const  tutorData = {
          tutorName : tutor.tutorName,
          tutorEmail : tutor.tutorEmail,
          phone : tutor.phone,
          tutorId : tutor._id
        }
        return res.status(201).json({
            message:'Tutor Registered Successfully',
        })
      }else{ 
        return res.status(400).json({error:"Invalid Tutor Details"})
      }        
    } catch (error) {
        res.status(500).json({
            error:"Internal Server Error"
        })        
    }
}

const tutorLogin =async(req:Request,res:Response)=>{
    const {tutorEmail,password}=req.body  
    try {       
      const tutor = await TutorModel.findOne( {tutorEmail:tutorEmail})
       if(!tutor){            
            return res.status(400).json({error:"No Tutor Found"})
        }
        if(tutor && (await tutor.matchPassword(password))){            
            //generate a jwt

            const  tutorData = {
              tutorName : tutor.tutorName,
              tutorEmail : tutor.tutorEmail,
              phone : tutor.phone,
              tutorId : tutor._id,
              image : tutor.photo
            }
            const token = generateToken(tutor._id)
           return res.status(200).json({
              tutorData,
                token,
                message:"Login Success"
            })
          
        }else{
            return res.status(400).json({error:"Invalid Email or Password"})
        }        
    } catch (error) {
      return  res.status(500).json({
            error:"Internal Server Error "
        })        
    }
}

const getTutorProfile = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
    const tutorData = await TutorModel.findOne({ _id: tutorId }); 
    console.log(tutorData,"tutordattaa")   
    if (!tutorData) {
      return res.status(404).json({ error: "Tutor not found" });
    }    
    return res.status(200).json({ tutorData });
  } catch (error) {
    console.error("Error fetching tutor profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const addCourse = async (req: Request, res: Response) => {
  try {
    const { courseName, courseDuration, courseDescription, courseFee, selectcategory ,image} = req.body;
  
    const categoryExist = await categoryModel.findById(selectcategory);
    if (!categoryExist) {
      return res.status(400).json({ error: "Category does not exist" });
    }

    const courseExist: Course | null = await courseModel.findOne({
      courseName: { $regex: new RegExp('^' + courseName + '$', 'i') }, // Match exact courseName
    });
    if (courseExist) {
      return res.status(400).json({ error: "Course already exists" });
    }

    const newCourse = await courseModel.create({
      courseName,
      courseDuration,
      courseDescription,
      courseFee,
      category: selectcategory,
      photo:image
    });

    if (newCourse) {
      return res.status(201).json({
        courseName,
        courseDescription,
        courseFee,
        courseDuration,
        selectcategory,
        image,
        message: "Course added successfully",
      });
    } else {
      return res.status(400).json({
        error: "Invalid course data",
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getAllCourse = async (req:Request,res:Response)=>{
  try{
    const courseDetails= await courseModel.find().exec()
    if(courseDetails){
      res.status(200).json({
        courseDetails,message:"courseDetails"
      })
    }else{
      return res.status(400).json({
        error:"no course available "
      })
    }
  }
  catch(error){
    console.log(error);
  }
}


const singleView = async (req:Request,res:Response)=>{
  try{
    const courseId = req.params.id;
    const courseDetails= await courseModel.findById(courseId)
    if(courseDetails){
      res.status(200).json({
        courseDetails,message:"Course details retrieved"
      })
    }else{
      return res.status(400).json({
        error:"No course available "
      })
    }
  }
  catch(error){
    console.log(error);
  }
}

const addLesson = async (req: Request, res: Response) => {
  try {
    const { title,description, selectcategory,selectcourse,video } = req.body;
  
    const categoryExist = await categoryModel.findById(selectcategory);
    if (!categoryExist) {
      return res.status(400).json({ error: "Category does not exist" });
    }

    const courseExist=await courseModel.findById(selectcourse);
    if (!courseExist) {
      return res.status(400).json({ error: "Course does not exist" });
    }

    const newLesson = await lessonModel.create({
      title,
      description,
      categoryId: selectcategory,
      courseId:selectcourse,
      video
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
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

//to get data in the editprofile page
const getProfileById =async (req:Request,res:Response)=>{
  const tutorId=req.params.tutorId;
  try{  
    const tutorDetails = await TutorModel.findById(tutorId).exec();
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
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
  }

  const updateProfile = async (req: Request, res: Response) => {
    try {
      const { tutorId } = req.params;    
      const { tutorName, tutorEmail, phone } = req.body;

      const tutor = await TutorModel.findById(tutorId);
       
      if (!tutor) {
        return res.status(404).json({ error: "Invalid category" });
      }
  
      tutor.tutorName = tutorName || tutor.tutorName;
      tutor.tutorEmail = tutorEmail || tutor.tutorEmail;
      tutor.phone = phone || tutor.phone;
  
      const updateTutorData = await tutor.save();

      //this is  sending along with response so that update the store
      const  tutorData = {
        tutorName : updateTutorData.tutorName,
        tutorEmail : updateTutorData.tutorEmail,
        phone : updateTutorData.phone,
        image:updateTutorData.photo,
        tutorId :updateTutorData._id,      
      }
     
      if (updateTutorData) {
        return res.status(200).json({tutorData,message: "Tutor updated successfully" });
      } else {
        return res.status(404).json({ error: "Failed to update tutor" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }


export{
    tutorLogin,
    registerTutor,
    getTutorProfile,
    addCourse,
    getAllCourse,
    addLesson,
    singleView,
    getProfileById,
    updateProfile,


}