import { Request, Response } from 'express';
import courseModel from '../../model/courseModel';
import TutorModel from '../../model/tutorModel';
import studentModel from '../../model/userModel';
import orderModel from '../../model/orderModel';
import notificationModel from '../../model/notificationModel';
import mongoose from 'mongoose';


const TotalSales = async (req: Request, res: Response) => {    
    try {
        const totalOrderCount = await orderModel.countDocuments({ status: "success" });
        const totalUsersCount = await studentModel.countDocuments({});
        const totalTutorCount = await TutorModel.countDocuments({});
        const totalCourseCount= await courseModel.countDocuments({});
        const TotalRevenue = await orderModel.aggregate([
            {
                $match: {
                    status: "success",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);

        const totals = TotalRevenue[0].total;
        const adminRevenue=(totals*0.2).toFixed(2);       
        const tutorRevenue=(totals*0.8).toFixed(2);       
        res.status(200).json({
            totalOrderCount,
            totalUsersCount,
            totalTutorCount,
            totalCourseCount,
            totals,
            adminRevenue,
            tutorRevenue,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

   const getNotification= async (req:Request, res:Response) => {
    try {
     const notifications= await notificationModel.find({ receiverUser: new mongoose.Types.ObjectId("65e6adc6193904154dc390e8"), isRead: false });
      res.status(200).json({notifications,message:"Notifications"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


export {TotalSales,
        getNotification,
        }