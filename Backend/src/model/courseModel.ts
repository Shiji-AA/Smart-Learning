import mongoose ,{Schema,Document,Model,model} from "mongoose";

export interface Course extends Document {
    courseName:string,
    courseDuration :string
    courseDescription :string,
    category:mongoose.Schema.Types.ObjectId,   
    photo:string,
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
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "categoryModel", 
        required: true       

    },
    
    courseFee:{
        type:Number,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    photo:[{
        type:String
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