import mongoose ,{Schema,Document,Model,model} from "mongoose";

export interface Course extends Document {
    courseName:string,
    courseDuration :string
    courseDescription :string,
    category:mongoose.Schema.Types.ObjectId,   
    photo:string,
    tutor: mongoose.Schema.Types.ObjectId,  
    students: mongoose.Schema.Types.ObjectId[],
    lessons: mongoose.Schema.Types.ObjectId[], 
    isApproved:boolean,
    isEnrolled:boolean,
    courseFee:number,  
    createdAt:Date,
    updatedAt:Date
}
const coursemodel =new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseDuration:{
        type:String,
        required:true
    },
    courseDescription:{
        type: String,
        required:true
    },     
    courseFee:{
        type:Number,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    isEnrolled:{
        type:Boolean,
        default:false,
    },
    photo:[{
        type:String
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "categoryModel", 
        required: true   
    },
    tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tutorModel",
        required:true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentModel',
      }],
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lessonModel',
      }],     
        createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

    
})



const courseModel:Model<Course> = mongoose.model<Course>("courseModel",coursemodel)

 export default courseModel