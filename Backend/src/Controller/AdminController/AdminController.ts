import { Category } from './../../model/categoryModel';
import { Request, Response } from "express";
import generateToken from "../../../Utils/generateToken";
import categoryModel from "../../model/categoryModel";
import courseModel from '../../model/courseModel';
import mongoose from 'mongoose';


const adminLogin = async (req: Request, res: Response) => {  
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "Admin@123";
        const id = new mongoose.Types.ObjectId("65e6adc6193904154dc390e8")
        const { email, password } = req.body;            
        if (adminEmail === email && adminPassword === password) {
            const token = generateToken(id);
            return res.status(200).json({
                id,
                adminEmail,
                token,message :"Logged successfully"             
            });
        } else {
            return res.status(401).json({ message: "Invalid Email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
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
      console.log(error);     
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
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }

  }

  const editCategory =async(req:Request,res: Response)=>{
    try{
      const {id}= req.params;
      console.log(id,"iddd")
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
      return res.status(500).json({error:"Internal server error"})
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
      res.status(500).json({error:"Error while deleting category"})
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
      res.status(500).json({error:"Error while deleting category"})
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
      console.error('Error toggling course status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
export{
    adminLogin,
    getAllCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
  getAdminCourseList,
  toggleCourseStatus,
}