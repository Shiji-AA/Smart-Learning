import { Request, Response } from 'express';
import courseModel from '../../model/courseModel';
import TutorModel from '../../model/tutorModel';
import studentModel from '../../model/userModel';
import orderModel from '../../model/orderModel';
import notificationModel from '../../model/notificationModel';
import mongoose from 'mongoose';
import errorHandler from '../../Constants/errorHandler';

const TotalSales = async (req: Request, res: Response) => {    
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        // Total counts
        const totalOrderCount = await orderModel.countDocuments({ status: "success" });
        const totalUsersCount = await studentModel.countDocuments({});
        const totalTutorCount = await TutorModel.countDocuments({});
        const totalCourseCount = await courseModel.countDocuments({});

        // Total Revenue calculation
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
        const totals: number = TotalRevenue[0]?.total || 0;
        const adminRevenue = (totals * 0.2).toFixed(2);       
        const tutorRevenue = (totals * 0.8).toFixed(2);

        // Monthly counts for orders and revenues
        const orderMonthlyCounts: number[] = new Array(12).fill(0);
        const revenueMonthlyCounts: number[] = new Array(12).fill(0);

        // Retrieve all orders for the current year
        const orders = await orderModel.find({ createdAt: { $gte: new Date(currentYear, 0, 1) } });
        orders.forEach((order) => {
            const orderCreatedDate = new Date(order.createdAt);
            const orderCreatedMonth = orderCreatedDate.getMonth();
            orderMonthlyCounts[orderCreatedMonth]++;
        });

        // Retrieve all revenues for the current year
        const revenues = await orderModel.find({ status: "success", createdAt: { $gte: new Date(currentYear, 0, 1) } });
        revenues.forEach((revenue) => {
            const revenueCreatedDate = new Date(revenue.createdAt);
            const revenueCreatedMonth = revenueCreatedDate.getMonth();
            revenueMonthlyCounts[revenueCreatedMonth] += revenue.amount;
        });

        res.status(200).json({
            totalOrderCount,
            totalUsersCount,
            totalTutorCount,
            totalCourseCount,
            totals,
            adminRevenue,
            tutorRevenue,
            orderMonthlyCounts,
            revenueMonthlyCounts
        });
    } catch (error) {
        console.log(error);
        return errorHandler(res, error);
    }
};

const getNotification = async (req: Request, res: Response) => {
    try {
        const notifications = await notificationModel.find({ receiverUser: new mongoose.Types.ObjectId("65e6adc6193904154dc390e8"), isRead: false });
        const notificationCount = notifications.length;
        console.log(notificationCount, "notificationCount")
        res.status(200).json({ notifications, notificationCount, message: "Notifications" });
    } catch (error) {
        return errorHandler(res, error);
    }
};

export { TotalSales, getNotification };
