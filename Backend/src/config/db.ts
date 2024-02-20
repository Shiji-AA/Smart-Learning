import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Extend NodeJS ProcessEnv interface to include MONGO_URI
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
    }
  }
}

// Ensure process.env.MONGO_URI is recognized as a string
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Ensure process.env.MONGO_URI is recognized as a string
        if (!mongoURI) {
            throw new Error("MongoURI is not defined in environment variables.");
        }
        const conn = await mongoose.connect(mongoURI); // connecting to MongoDB database using Mongoose
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
