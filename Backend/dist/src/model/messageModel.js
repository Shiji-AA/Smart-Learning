"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatMessageSchema = new mongoose_1.default.Schema({
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'tutorModel',
        required: true,
    },
    receiverId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'studentModel',
        required: true,
    },
    message: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true
});
const MessageModel = mongoose_1.default.model('messageModel', chatMessageSchema);
exports.default = MessageModel;
