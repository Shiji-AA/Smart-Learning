import { Request, Response } from 'express';
import chatModel from '../../model/chatModel';
import studentModel from '../../model/userModel';
import TutorModel from '../../model/tutorModel';
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

        //SOCKET IO FUNCTIONALITY  WILL GO HERE

        //await chat.save();
        //await newMessage.save();

        //this will run in parallel
        await Promise.all([chat.save(),newMessage.save()]);

        res.status(201).json({ newMessage,message:"message created successfully"});

    }
    catch(error){
        console.log("error while creating message",error)
        res.status(500).json({error:"Internal server Error"})
    } 
};

//fetch all chats to a particular user

const fetchChats = async (req: Request, res: Response) => {
    //    console.log("message sent",req.params.id)
    try {
        const { id: userToChatId } = req.params; //studentId
        const senderId = (req as any).user; //tutorId
        //console.log(senderId,"senderId")
        //console.log(userToChatId,"ReceiverId")

        const chat = await chatModel.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");    //NOT REFERENCE BUT ACTUAL MESSAGES
        
        console.log(chat,"chat");

        if (!chat) {return res.status(200).json([])};
        const messageData = chat.messages
        res.status(200).json({messageData,message:"ChatMessages"});
    } catch (error) {
        console.error("Error in fetchChats:", error);
        res.status(500).json({ error, message: "Error while fetching messages" });
    }
};





 export {accessChat,
        fetchChats,       
        };