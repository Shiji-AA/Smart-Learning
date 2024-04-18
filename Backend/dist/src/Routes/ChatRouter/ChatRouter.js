"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentAuth_1 = require("./../../../middleware/studentAuth");
const express_1 = __importDefault(require("express"));
const chatRouter = express_1.default.Router();
const ChatController_1 = require("../../Controller/ChatController/ChatController");
chatRouter.post('/accesschat/:userId', studentAuth_1.isLogin, ChatController_1.accessChat);
chatRouter.get('/fetchchats/:id', studentAuth_1.isLogin, ChatController_1.fetchChats);
exports.default = chatRouter;
