"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaymentController_1 = __importDefault(require("../../Controller/PaymentController/PaymentController"));
const paymentRouter = express_1.default.Router();
paymentRouter.post("/create-checkout-session", PaymentController_1.default);
exports.default = paymentRouter;
