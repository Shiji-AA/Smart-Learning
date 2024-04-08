import mongoose, { Document, Model, Schema } from "mongoose";
interface Course extends Document {  
    courseName: string;
    courseDuration: string;
    courseDescription: string;
    category: mongoose.Types.ObjectId;
    photo: string;    
    isApproved: boolean;
    isEnrolled: boolean;
    courseFee: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface Wishlist extends Document {
    course: mongoose.Types.ObjectId;
}

const wishlistSchema = new Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courseModel",
        required: true
    }, 
    isWishlisted:{
        type:Boolean,
        default:false,
    },  
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const WishlistModel = mongoose.model<Wishlist>("Wishlist", wishlistSchema, "wishlistmodels");

export default WishlistModel;
