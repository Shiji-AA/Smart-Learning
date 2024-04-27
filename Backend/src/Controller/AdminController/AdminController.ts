import errorHandler from '../../Constants/errorHandler';
import { Category } from './../../model/categoryModel';
import { Request, Response } from "express";
import generateToken from "../../../Utils/generateToken";
import categoryModel from "../../model/categoryModel";
import courseModel from '../../model/courseModel';
import mongoose from 'mongoose';
import notificationModel from '../../model/notificationModel';


const adminLogin = async (req: Request, res: Response) => {  
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "Admin@123";
        const id = new mongoose.Types.ObjectId("65e6adc6193904154dc390e8")
        const { email, password } = req.body;            
        if (adminEmail === email && adminPassword === password) {

            const {token,refreshToken} = generateToken(id);
            return res.status(200).json({
                id,
                adminEmail,
                token,
                refreshToken,
                message :"Logged successfully"             
            });
        } else {
            return res.status(401).json({ message: "Invalid Email or password" });
        }
    } catch (error) {
      return errorHandler(res, error);
    }
};



//get All Catagories

const getAllCategory = async (req: Request, res: Response) => {
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
      return errorHandler(res, error);   
    }
  };

  //to get category details as per id
const getCategoryById =async (req:Request,res:Response)=>{
  const categoryId=req.params.id;
  try{
  
    const categoryDetails = await categoryModel.findById(categoryId).exec();
    if (categoryDetails) {
      res.status(200).json({
        categoryDetails,
        message: "Category found successfully",
      });
    } else {
      return res.status(404).json({
        message: "Category not found",
      });
    }
  } catch (error) {
    return errorHandler(res, error);
  }

  }

  const editCategory =async(req:Request,res: Response)=>{
    try{
      const {id}= req.params;
      //console.log(id,"iddd")
      const {title,description} =req.body;
      const category : Category | null = await categoryModel.findById(id);
      if(!category){
        return res.status(404).json({error:"Invalid category"})
      }
  
      category.title =title || category.title;
      category.description= description || category.description;
      const updateCategory = await category.save();
  
      if(updateCategory){
        return res.status(200).json(
          {message:"Category updated successfully"}
          )
      }else{
        return res.status(404).json({error:"Failed to update category"})
      }
    }
    catch(error){
      return errorHandler(res, error);
    }
  }
  const deleteCategory = async(req:Request,res:Response)=>{
    try{
      const {id}=req.params;
      const category = await categoryModel.findById(id);
      if(!category){
        return res.status(400).json({error:"Category not found"})
      }
   await categoryModel.findByIdAndDelete(id)
   res.status(200).json({message:"category deleted successfully"})
      }  
    catch(error){    
      return errorHandler(res, error);
    }  
  }

  const getAdminCourseList = async(req:Request,res:Response)=>{
    try{
      const courseDetails= await courseModel.find().exec();
      //console.log(courseDetails,"i am")
      if(courseDetails){
          res.status(200).json({
          courseDetails,message:"CourseDetails"
        })
      }else{
        return res.status(400).json({
          error:"no course available"
        })
      }
    }
    catch(error){
    return errorHandler(res,error)
    }
  }

  //For admin approval of course
  const toggleCourseStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const course = await courseModel.findById(id);  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      } 
      course.isApproved = !course.isApproved;
      await course.save();
  
      return res.status(200).json({ message: 'Course status toggled successfully', course });
    } catch (error) {
    return errorHandler(res,error)
    }
  };
  const marknotificationasread = async(req:Request,res:Response)=>{
    try{
      const notificationId = req.params.notificationId;
      if(!notificationId){
        return res.status(404).send({message:"NOTificationID Not found"})
      }
      const updatedNotification= await notificationModel.findByIdAndUpdate(
    notificationId,{isRead : true},{new:true}
      )
      if(!updatedNotification){
        return res.status(404).send({ message: "Notification is not found" });
      }
      res.status(200).send({message:"Notification marked as read",notification: updatedNotification });
    }
    catch(error){
    return errorHandler(res,error)
    }
  }
  
export{
    adminLogin,
    getAllCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
  getAdminCourseList,
  toggleCourseStatus,
  marknotificationasread,
}