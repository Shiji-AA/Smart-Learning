import jwt, { JwtPayload } from "jsonwebtoken";
import { Server, Socket } from "socket.io"; 

import UserModel from "../src/model/userModel"; 
import TUTOR from "../src/model/tutorModel"; 
import TutorModel from "../src/model/tutorModel";
import chatModel from "../src/model/chatModel";

interface SocketUser {
  _id: string;
}
interface UserSocket extends Socket {
  user?: SocketUser;
}
enum ChatEventEnum {
  CONNECTED_EVENT = "connected",
  DISCONNECT_EVENT = "disconnect",
  JOIN_CHAT_EVENT = "joinChat",
  LEAVE_CHAT_EVENT = "leaveChat",
  MESSAGE_RECEIVED_EVENT = "messageReceived",
  NEW_CHAT_EVENT = "newChat",
  SOCKET_ERROR_EVENT = "socketError",
  STOP_TYPING_EVENT = "stopTyping",
  TYPING_EVENT = "typing",
}

const mountJoinChatEvent = (socket: UserSocket) => {
  socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId: any) => {
   
    console.log(`User joined the chat 🤝. chatId: `, chatId);
    socket.join(chatId);
  });
};

const initializeSocketIO = (io: Server) => {
  console.log("socket.io initialized");
  return io.on("connection", async (socket: UserSocket) => {
    const role = socket.handshake.query.role;
    //console.log(socket.handshake.auth, "HANDSHAKE");
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        console.log("Un-authorized handshake. Token is missing");
        return;
      }

      const decodedToken: JwtPayload | any = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
      //console.log(decodedToken, "DECODED TOKEN");
      if (!decodedToken?.user_id) {
        console.log("Un-authorized handshake. Token is invalid");
        return;
      }

      let user:any;
      if (role === "user") {
        user = await UserModel.findById(decodedToken.user_id);
      } else {
        user = await TutorModel.findById(decodedToken.user_id);
      }

      if (!user) {
        console.log("Un-authorized handshake. Token is invalid");
        return;
      }

     
      socket.user = user._id;
      const roomId = user._id.toString();
      socket.join(roomId);
      socket.emit(ChatEventEnum.CONNECTED_EVENT);
      console.log("User connected Id: ", user._id.toString());

      mountJoinChatEvent(socket);

      socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        console.log("user has disconnected 🚫. userId: " + socket.user?._id);
        if (socket.user?._id) {
          socket.leave(socket.user._id);
        }
      });

      socket.on("JOIN_CHAT_STUDENT",async ({ tutorId}: { tutorId: string }) => {
        const chat =await chatModel.findOne({participants:{$all:[socket.user?._id,tutorId]}}) 
        console.log(socket.user?._id,"socketUserIdd")
        console.log(tutorId,"userIdd")     
        socket.join(chat?.id);
        console.log(socket?.user?._id.toString(), " joined room: 1234", chat?.id);
      });

      socket.on("JOIN_CHAT_TUTOR",async ({userId}: { userId: string }) => {
        const chat =await chatModel.findOne({participants:{$all:[socket.user?._id,userId]}})
        // console.log(socket.user?._id,"socketUserIdd")
        // console.log(userId,"userIdd")
        socket.join(chat?.id);

        console.log(socket?.user?._id.toString(), " joined room: ", chat?.id);
      });

      socket.on("LEAVE_CHAT", ({ chatId }: { chatId: string }) => {
        socket.leave(chatId);
        console.log(user._id.toString(), " left room: ", chatId);
      });

      socket.on(
        "SEND_MESSAGE",
       async ({ senderId, receiverId ,message}: { senderId: string;receiverId:string; message: any }) => {
        console.log("message: " + message)
          const chat =await chatModel.findOne({participants:{$all:[socket.user?._id,receiverId]}})
          console.log(chat?.id,"chatId")
          socket.to(chat?.id).emit("GET_MESSAGE", message);

        }
      );
    } catch (error:any) {
      socket.emit(
        ChatEventEnum.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};

const emitSocketEvent = (
  req: any,
  roomId: string,
  event: string,
  payload: any
) => {
  req.app.get("io").in(roomId).emit(event, payload);
};

export { initializeSocketIO, emitSocketEvent };
