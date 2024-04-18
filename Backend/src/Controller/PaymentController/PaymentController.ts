import { Request, Response } from "express";
import studentModel, { Student } from "../../model/userModel";
import orderModel from "../../model/orderModel";
import courseModel from "../../model/courseModel";
import Stripe from "stripe";
import errorHandler from "../../Constants/errorHandler";

const stripeSecretKey = process.env.STRIPE_KEY as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

const stripePayment = async (req: Request, res: Response) => {
  try {   
    const { courseDetails, studentId } = req.body;
    // console.log(courseDetails,"coursedetails")

    const session = await stripe.checkout.sessions.create({
      phone_number_collection: {
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: courseDetails?.courseName,
              images: courseDetails?.photo,
              description: courseDetails?.courseDescription,              
              metadata: {
                id: courseDetails?._id,
              },
            },
            unit_amount: courseDetails?.courseFee * 100,
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
      const tutorId = courseDetails?.tutor;
      const courseId = courseDetails?._id;
      const coursename = courseDetails?.courseName;
      const amount = courseDetails?.courseFee;
      const order = await orderModel.create({
        studentId,
        tutorId,
        courseId,
        coursename,
        amount,
      });
      await order.save();

      await courseModel.findByIdAndUpdate(courseId,{ 
         $push: { students: studentId },
         isEnrolled: true 
      });

      console.log("Order saved:", order);      
      return order;
    }
  } catch (error) {
    return errorHandler(res,error); 
  }
};

export default stripePayment;
