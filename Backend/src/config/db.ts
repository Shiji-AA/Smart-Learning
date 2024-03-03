import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_uri: string | undefined = process.env.MONGO_URI;

export const connectDB = async (): Promise<void> => {
    try {
        if (!mongo_uri) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }
        await mongoose.connect(mongo_uri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
};
