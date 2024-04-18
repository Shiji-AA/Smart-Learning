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
const orderModel_1 = __importDefault(require("../../model/orderModel"));
const courseModel_1 = __importDefault(require("../../model/courseModel"));
const stripe_1 = __importDefault(require("stripe"));
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
const stripeSecretKey = process.env.STRIPE_KEY;
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: "2023-10-16",
});
const stripePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseDetails, studentId } = req.body;
        // console.log(courseDetails,"coursedetails")
        const session = yield stripe.checkout.sessions.create({
            phone_number_collection: {
                enabled: true,
            },
            line_items: [
                {
                    price_data: {
                        currency: "BDT",
                        product_data: {
                            name: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseName,
                            images: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.photo,
                            description: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseDescription,
                            metadata: {
                                id: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails._id,
                            },
                        },
                        unit_amount: (courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseFee) * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/paymentSuccess`,
            cancel_url: `${process.env.CLIENT_URL}/usercourselist`,
        });
        console.log("Stripe Payment Session Created:", session);
        res.json({
            url: session.url,
        });
        console.log(session.payment_status, "status");
        //Order creation
        if (session.payment_status === "unpaid") {
            const tutorId = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.tutor;
            const courseId = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails._id;
            const coursename = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseName;
            const amount = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseFee;
            const order = yield orderModel_1.default.create({
                studentId,
                tutorId,
                courseId,
                coursename,
                amount,
            });
            yield order.save();
            yield courseModel_1.default.findByIdAndUpdate(courseId, {
                $push: { students: studentId },
                isEnrolled: true
            });
            console.log("Order saved:", order);
            return order;
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.default = stripePayment;
