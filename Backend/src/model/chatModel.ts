import mongoose from "mongoose";

interface Chat extends Document {
  participants: mongoose.Schema.Types.ObjectId;
  messages: mongoose.Schema.Types.ObjectId;
  chatName: string;
  timestamp: Date;
}
const ChatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentModel",
      },
    ],

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageModel",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("chatModel", ChatSchema);
