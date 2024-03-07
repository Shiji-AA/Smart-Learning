import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, model, Model, trusted } from 'mongoose';


export interface TUTOR extends Document {
    tutorName: string;
    tutorRole: string
    tutorEmail: string;
    phone: string;
    password: string;
    photo: string;
    isBlocked: boolean;
    courses: mongoose.Schema.Types.ObjectId;  
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const TutorSchema = new Schema<TUTOR>({
    tutorName: {
        type: String,
        required: true,
    },
    tutorRole: {
        type: String, 
        required: true,
        default: "tutor", 
    },
    tutorEmail: {
        type: String,
        required: true,
        unique: true, 
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo:{
        type:String,
        default:"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    },
    
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseModel',
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
    isBlocked: {
        type: Boolean,
        default: false,
    },
  
}, { timestamps: true });

TutorSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};
     
TutorSchema.pre<TUTOR>('save', async function (next) { 
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define the model using the model function and export it
const TutorModel: Model<TUTOR> =mongoose.model<TUTOR>('tutorModel', TutorSchema);
export default TutorModel;