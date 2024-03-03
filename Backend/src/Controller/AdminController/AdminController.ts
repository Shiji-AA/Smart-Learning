

import { Request, Response } from "express";
import generateToken from "../../../Utils/generateToken";
import categoryModel from "../../model/categoryModel";


const adminLogin = async (req: Request, res: Response) => {  
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";
        const id = "ObjectId(65deabd77bad0a47e7fc0f68)";
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




export{
    adminLogin,
    getAllCategory,

}