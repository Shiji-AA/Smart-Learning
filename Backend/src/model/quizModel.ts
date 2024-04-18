import mongoose, { Schema,Model, model, Document } from "mongoose";

interface Quiz extends Document {
  questionset: {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answerOption: string;
    isActive: boolean;
  }[];
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
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courseModel',
}

});

const quizModel: Model<Quiz> = mongoose.model<Quiz>('quizModel', courseQuizSchema);

export default quizModel;