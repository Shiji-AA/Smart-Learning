import { Request, Response } from 'express';
import chatModel from '../../model/chatModel';
import MessageModel from '../../model/messageModel';

//for creating message
const accessChat = async (req: Request, res: Response) => {
    // console.log("message sent",req.params.userId)
    try{
        const { message } = req.body;
        console.log(message,"message")
        if (!message) {
        return res.status(400).json({ error: 'Message is required' });
        }
        const{ userId: receiverId } = req.params;
        console.log(receiverId,"userID");
        const senderId=(req as any).user;
        let chat = await chatModel.findOne({
            participants:{$all:[senderId,receiverId]}
        });
        if(!chat){
            chat = await chatModel.create({
                participants :[senderId,receiverId]
            })
        }
        const newMessage = new MessageModel({
            senderId,            
            receiverId,
            message,
        })
        if(newMessage){
            chat.messages.push(newMessage._id)
        }
        await Promise.all([chat.save(),newMessage.save()]);
        //console.log(newMessage, "success!!!!!!!")
        res.status(201).json({ newMessage,message:"message created successfully"});
    }
    catch(error){
        console.log("error while creating message",error)
        res.status(500).json({error:"Internal server Error"})
    } 
};
  
 export {accessChat,               
        };
        