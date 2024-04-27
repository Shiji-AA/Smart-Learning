"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotification = exports.TotalSales = void 0;
const courseModel_1 = __importDefault(require("../../model/courseModel"));
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const userModel_1 = __importDefault(require("../../model/userModel"));
const orderModel_1 = __importDefault(require("../../model/orderModel"));
const notificationModel_1 = __importDefault(require("../../model/notificationModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
const TotalSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        // Total counts
        const totalOrderCount = yield orderModel_1.default.countDocuments({ status: "success" });
        const totalUsersCount = yield userModel_1.default.countDocuments({});
        const totalTutorCount = yield tutorModel_1.default.countDocuments({});
        const totalCourseCount = yield courseModel_1.default.countDocuments({});
        // Total Revenue calculation
        const TotalRevenue = yield orderModel_1.default.aggregate([
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
        const totals = ((_a = TotalRevenue[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        const adminRevenue = (totals * 0.2).toFixed(2);
        const tutorRevenue = (totals * 0.8).toFixed(2);
        // Monthly counts for orders and revenues
        const orderMonthlyCounts = new Array(12).fill(0);
        const revenueMonthlyCounts = new Array(12).fill(0);
        // Retrieve all orders for the current year
        const orders = yield orderModel_1.default.find({ createdAt: { $gte: new Date(currentYear, 0, 1) } });
        orders.forEach((order) => {
            const orderCreatedDate = new Date(order.createdAt);
            const orderCreatedMonth = orderCreatedDate.getMonth();
            orderMonthlyCounts[orderCreatedMonth]++;
        });
        // Retrieve all revenues for the current year
        const revenues = yield orderModel_1.default.find({ status: "success", createdAt: { $gte: new Date(currentYear, 0, 1) } });
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
    }
    catch (error) {
        console.log(error);
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.TotalSales = TotalSales;
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notificationModel_1.default.find({ receiverUser: new mongoose_1.default.Types.ObjectId("65e6adc6193904154dc390e8"), isRead: false });
        const notificationCount = notifications.length;
        console.log(notificationCount, "notificationCount");
        res.status(200).json({ notifications, notificationCount, message: "Notifications" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getNotification = getNotification;
