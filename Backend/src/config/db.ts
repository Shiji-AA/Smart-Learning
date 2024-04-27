import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const mongo_uri = 'mongodb+srv://shiji123:shiji123@smartlearning.xrns1og.mongodb.net/?retryWrites=true&w=majority&appName=SmartLearning';


export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://shiji123:shiji123@smartlearning.xrns1og.mongodb.net/?retryWrites=true&w=majority');
        console.log('====================================');
        console.log("MongoDB connected");
        console.log('====================================');
        
    } catch (error) {
        console.error(error);
    }
}

