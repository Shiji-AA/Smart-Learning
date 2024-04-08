import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors'
const app = express();

import {connectDB} from "./config/db";

dotenv.config(); // This will read your .env file and apply the configurations
const port = process.env.PORT || 3000;
connectDB();

app.use (cors());

import studentRouter from './Routes/StudentRouter/StudentRouter';
import adminRouter from "./Routes/AdminRouter/AdminRouter";
import tutorRouter from "./Routes/TutorRouter/TutorRouter";
import paymentRouter from './Routes/PaymentRouter/PaymentRouter';
import chatRouter from "./Routes/ChatRouter/ChatRouter";

   
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tutor',tutorRouter)
app.use('/api/payment', paymentRouter);
app.use('/api/chat',chatRouter);


app.get('/', (req, res) => res.send("Hello Server is running"));
    
app.listen(port, () => console.log(`Server started at ${port}`))

   