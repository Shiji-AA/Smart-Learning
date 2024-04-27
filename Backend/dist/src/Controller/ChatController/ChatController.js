"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChats = exports.accessChat = void 0;
const chatModel_1 = __importDefault(require("../../model/chatModel"));
const messageModel_1 = __importDefault(require("../../model/messageModel"));
//for creating message
const accessChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("message sent",req.params.userId)
    try {
        const { message } = req.body;
        console.log(message, "message");
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const { userId: receiverId } = req.params;
        console.log(receiverId, "userID");
        const senderId = req.user;
        let chat = yield chatModel_1.default.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!chat) {
            chat = yield chatModel_1.default.create({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = new messageModel_1.default({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            chat.messages.push(newMessage._id);
        }
        yield Promise.all([chat.save(), newMessage.save()]);
        //console.log(newMessage, "success!!!!!!!")
        res.status(201).json({ newMessage, message: "message created successfully" });
    }
    catch (error) {
        console.log("error while creating message", error);
        res.status(500).json({ error: "Internal server Error" });
    }
});
exports.accessChat = accessChat;
//fetch all chats to a particular Tutor
const fetchChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params; //studentId
        // console.log(id, "StudentId")
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; //tutorId   
        //console.log(id, senderId,"jjj")
        const chat = yield chatModel_1.default.findOne({
            participants: { $all: [senderId, id] },
        }).populate("messages");
        if (!chat) {
            return res.status(200).json([]);
        }
        ;
        //console.log(chat?.messages, "chat")
        const messageData = chat.messages;
        console.log(messageData, "messageData");
        res.status(200).json({ messageData, message: "ChatMessages" });
    }
    catch (error) {
        console.error("Error in fetchChats:", error);
        res.status(500).json({ error, message: "Error while fetching messages" });
    }
});
exports.fetchChats = fetchChats;
