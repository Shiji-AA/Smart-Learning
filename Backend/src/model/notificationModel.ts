import mongoose ,{ Document, Schema, Model, model } from "mongoose";

export interface Notification extends Document {
    senderUser: mongoose.Schema.Types.ObjectId,
    receiverUser:mongoose.Schema.Types.ObjectId,
    message:string,  
    type:string, 
    read:boolean,  
    createdAt:Date,
    updatedAt:Date
}

const notificationSchema =new Schema<Notification>({
   
    senderUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tutorModel",    
    },
    receiverUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentModel',
    },
    message : {
        type : String,
    }, 
    type : {
        type : String,
    },
    read : {
        type : Boolean,
        default : false
    },   
  
},{timestamps:true})

const  notificationModel:Model<Notification> =model<Notification>("notificationModel",notificationSchema);
export default notificationModel;