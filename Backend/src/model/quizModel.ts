import mongoose, { Schema,Model, model, Document } from "mongoose";

interface Quiz extends Document {
  questionset: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: mongoose.Schema.Types.ObjectId;
  isActive: boolean;
}

const courseQuizSchema = new Schema<Quiz>({
  questionset: [
    {
      question: {
        type: String,
        required: true,
      },
      option1: {
        type: String,
        required: true,
      },
      option2: {
        type: String,
        required: true,
      },
      option3: {
        type: String,
        required: true,
      },
      option4: {
        type: String,
        required: true,
      },
      answerOption: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
        default:true,
      },
    },
  ],

  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'courseModel',
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
});

const quizModel: Model<Quiz> = mongoose.model<Quiz>('quizModel', courseQuizSchema);

export default quizModel;