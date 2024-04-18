"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const coursemodel = new mongoose_1.default.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDuration: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseFee: {
        type: Number,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isEnrolled: {
        type: Boolean,
        default: false,
    },
    isLessonCompleted: {
        type: Boolean,
        default: false,
    },
    photo: [{
            type: String
        }],
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "categoryModel",
        required: true
    },
    tutor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "tutorModel",
        required: true
    },
    students: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'studentModel',
        }],
    lessons: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'lessonModel',
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const courseModel = mongoose_1.default.model("courseModel", coursemodel);
exports.default = courseModel;
