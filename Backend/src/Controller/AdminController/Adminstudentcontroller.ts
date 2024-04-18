import { Request,Response } from "express";
import studentModel from "../../model/userModel";
import errorHandler from "../../Constants/errorHandler";
interface Student{
  _id: string;
  studentName:string,
  studentEmail:string,
  phone:string;
  isBlocked:boolean,
}
//get All Students

const getAllstudents = async (req: Request, res: Response) => {
    try {
      const studentDetails = await studentModel.find({__v: { $ne: 1 }}).exec();      
      if (studentDetails.length > 0) {     
        res.status(200).json({
            studentDetails,
          message: " Students found",
        });
      } else {
        return res.status(404).json({
          message: "No students found",
        });
      }
    } catch (error) {
      return errorHandler(res, error);    
    }
  };

  const searchStudent= async (req: Request, res: Response) => {
      try {          
          const searchCriteria = req.query.searchCriteria;       
            
        
          if (!searchCriteria || typeof searchCriteria !== 'string') {
              return res.status(400).send('Invalid search criteria');
          }  
          const studentDetails = await studentModel.find({
              $and: [
                  {studentName: { $regex: `^${searchCriteria}`, $options: 'i' } }, // Starts with 'a' search
                  {studentName: { $not: { $eq: 'Admin' } } } // Exclude records where name is 'admin' (case-insensitive)
              ]
          });  
          res.status(200).json(studentDetails); 
      } catch (error:any) {
        return errorHandler(res, error);
      }
  }
//Block the student
 
const unlistStudent = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
   
      const student = await studentModel.findById(id);

      if (!student) {
          console.log("Student not found");
          return res.status(404).json({ message: "Student not found" });
      }

      student.isBlocked = true;
      await student.save();

      return res.status(200).json({ message: "Student has been successfully unlisted" });
  } catch (error) {
    return errorHandler(res, error);
  }
}
  
  //unblock the student
  const relistStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id,"student id to unblock")
        const student = await studentModel.findById(id);

        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ message: "Student not found" });
        }

        student.isBlocked = false; // Setting isBlocked to false to relist the student
        await student.save();

        return res.status(200).json({ message: "Student has been successfully relisted" });
    } catch (error) {
      return errorHandler(res, error);
    }
}

  

  export { searchStudent, getAllstudents ,unlistStudent,relistStudent};
