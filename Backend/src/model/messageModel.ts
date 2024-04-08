import mongoose, { Model, Document } from "mongoose";

// Define the Message interface
interface Message extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  message: string;
  timestamp: Date;
}

const chatMessageSchema = new mongoose.Schema<Message>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tutorModel',
    required :true,
  },
  receiverId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studentModel',
    required :true, 
  },
    message: {
    type: String,
    trim:true,
    required :true,
  },
 
},{
  timestamps:true
});
const MessageModel: Model<Message> = mongoose.model<Message>('messageModel', chatMessageSchema);

export default MessageModel;