"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChatSchema = new mongoose_1.default.Schema({
    chatName: {
        type: String,
        trim: true,
    },
    participants: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "studentModel",
        },
    ],
    messages: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "messageModel",
            default: [],
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("chatModel", ChatSchema);
