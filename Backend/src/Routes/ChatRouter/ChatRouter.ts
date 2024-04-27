import { accessChat, fetchChats } from '../../Controller/ChatController/ChatController';
import { isLogin } from './../../../middleware/studentAuth';
import express from 'express';
const chatRouter = express.Router();



chatRouter.post('/accesschat/:userId',isLogin , accessChat);
chatRouter.get('/fetchchats/:id', isLogin ,fetchChats);

export default chatRouter;