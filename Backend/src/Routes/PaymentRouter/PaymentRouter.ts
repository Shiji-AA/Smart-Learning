import express from "express";

import stripePayment from "../../Controller/PaymentController/PaymentController";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", stripePayment);

export default paymentRouter;
