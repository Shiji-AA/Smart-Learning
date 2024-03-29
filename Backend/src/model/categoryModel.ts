import mongoose, {Schema,Document, Model,model } from "mongoose";

export interface Category extends Document {
    title:string,
    description:string,
   
    createdAt:Date,
    updatedAt:Date
}

const categorySchema =new Schema<Category>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   
    createdAt:{
        type: Date,
        required:true,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now
    }
},{timestamps:true})

// const categoryModel= mongoose.model("categoryCollection",categorySchema)

const categoryModel:Model<Category> =model<Category>("categoryModel",categorySchema)

export default categoryModel