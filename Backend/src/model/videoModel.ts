import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface VIDEOCALL extends Document {
    senderUser: mongoose.Schema.Types.ObjectId;
    receiverUser: mongoose.Schema.Types.ObjectId;   
    courseId: mongoose.Schema.Types.ObjectId;
    videocallStart:Date;
    videocallEnd:Date;
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const videocallSchema = new Schema<VIDEOCALL>({
    senderUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tutorModel",    
    },
    receiverUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentModel',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseModel',
    },  
   videocallStart:{
    type: Date,
    required: true,
    default: Date.now,

   },
   videocallEnd:{
    type: Date,
    required: true,
    default: Date.now,

   },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });

videocallSchema.methods.matchPassword = async function (enteredPassword: string) {
    // Assuming you have a password field in your schema
    return await bcrypt.compare(enteredPassword, this.password);
};

const VideoModel: Model<VIDEOCALL> = model<VIDEOCALL>("VideoCallModel", videocallSchema);
export default VideoModel;
