
import mongoose,{Schema,Document,Model} from "mongoose";
import bcrypt from 'bcryptjs';

//structure of a student document in mongodb
export interface Student extends Document {
    studentName:string,
    studentRole: string,
    studentEmail:string,
    phone:string,
    password:string,
    photo:string,
    courses:mongoose.Schema.Types.ObjectId,  
    createAt:Date,
    updatedAt:Date,
    isBlocked:boolean,
    verifyToken:string,
    refreshToken:string,
    matchPassword(enteredPassword:string):Promise<boolean>
}
const userSchema = new Schema<Student>({
    studentName:{
        type:String,
        required:true
    },
    studentRole: {
        type: String, 
        required: true,
        default: "student", 
    },
    studentEmail:{
        type:String,
        required:true,
        unique:true   
    },
    phone: {
        type: String, 
        unique: false,          
    },
    password:{
        type:String,
        required: true,        
    },
    photo:{
        type:String,
        default:"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    },
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseModel"
    },
   
    isBlocked:{
        type:Boolean,        
        default:false
    },
    createAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    verifyToken:{
        type:String
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

  userSchema.methods.matchPassword = async function (enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
  }
  userSchema.pre<Student>('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt =await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password,salt);
    next();
  })
const studentModel:Model<Student> = mongoose.model<Student>('studentModel',userSchema)

export default studentModel
