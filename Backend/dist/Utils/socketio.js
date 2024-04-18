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
exports.emitSocketEvent = exports.initializeSocketIO = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../src/model/userModel"));
const tutorModel_1 = __importDefault(require("../src/model/tutorModel"));
const chatModel_1 = __importDefault(require("../src/model/chatModel"));
var ChatEventEnum;
(function (ChatEventEnum) {
    ChatEventEnum["CONNECTED_EVENT"] = "connected";
    ChatEventEnum["DISCONNECT_EVENT"] = "disconnect";
    ChatEventEnum["JOIN_CHAT_EVENT"] = "joinChat";
    ChatEventEnum["LEAVE_CHAT_EVENT"] = "leaveChat";
    ChatEventEnum["MESSAGE_RECEIVED_EVENT"] = "messageReceived";
    ChatEventEnum["NEW_CHAT_EVENT"] = "newChat";
    ChatEventEnum["SOCKET_ERROR_EVENT"] = "socketError";
    ChatEventEnum["STOP_TYPING_EVENT"] = "stopTyping";
    ChatEventEnum["TYPING_EVENT"] = "typing";
})(ChatEventEnum || (ChatEventEnum = {}));
const mountJoinChatEvent = (socket) => {
    socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
    });
};
const initializeSocketIO = (io) => {
    console.log("socket.io initialized");
    return io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const role = socket.handshake.query.role;
        //console.log(socket.handshake.auth, "HANDSHAKE");
        try {
            const token = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token;
            if (!token) {
                console.log("Un-authorized handshake. Token is missing");
                return;
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            //console.log(decodedToken, "DECODED TOKEN");
            if (!(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.user_id)) {
                console.log("Un-authorized handshake. Token is invalid");
                return;
            }
            let user;
            if (role === "user") {
                user = yield userModel_1.default.findById(decodedToken.user_id);
            }
            else {
                user = yield tutorModel_1.default.findById(decodedToken.user_id);
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
                var _a, _b;
                console.log("user has disconnected 🚫. userId: " + ((_a = socket.user) === null || _a === void 0 ? void 0 : _a._id));
                if ((_b = socket.user) === null || _b === void 0 ? void 0 : _b._id) {
                    socket.leave(socket.user._id);
                }
            });
            socket.on("JOIN_CHAT_STUDENT", ({ tutorId }) => __awaiter(void 0, void 0, void 0, function* () {
                var _b, _c, _d;
                const chat = yield chatModel_1.default.findOne({ participants: { $all: [(_b = socket.user) === null || _b === void 0 ? void 0 : _b._id, tutorId] } });
                console.log((_c = socket.user) === null || _c === void 0 ? void 0 : _c._id, "socketUserIdd");
                console.log(tutorId, "userIdd");
                socket.join(chat === null || chat === void 0 ? void 0 : chat.id);
                console.log((_d = socket === null || socket === void 0 ? void 0 : socket.user) === null || _d === void 0 ? void 0 : _d._id.toString(), " joined room: 1234", chat === null || chat === void 0 ? void 0 : chat.id);
            }));
            socket.on("JOIN_CHAT_TUTOR", ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
                var _e, _f;
                const chat = yield chatModel_1.default.findOne({ participants: { $all: [(_e = socket.user) === null || _e === void 0 ? void 0 : _e._id, userId] } });
                // console.log(socket.user?._id,"socketUserIdd")
                // console.log(userId,"userIdd")
                socket.join(chat === null || chat === void 0 ? void 0 : chat.id);
                console.log((_f = socket === null || socket === void 0 ? void 0 : socket.user) === null || _f === void 0 ? void 0 : _f._id.toString(), " joined room: ", chat === null || chat === void 0 ? void 0 : chat.id);
            }));
            socket.on("LEAVE_CHAT", ({ chatId }) => {
                socket.leave(chatId);
                console.log(user._id.toString(), " left room: ", chatId);
            });
            socket.on("SEND_MESSAGE", ({ senderId, receiverId, message }) => __awaiter(void 0, void 0, void 0, function* () {
                var _g;
                console.log("message: " + message);
                const chat = yield chatModel_1.default.findOne({ participants: { $all: [(_g = socket.user) === null || _g === void 0 ? void 0 : _g._id, receiverId] } });
                console.log(chat === null || chat === void 0 ? void 0 : chat.id, "chatId");
                socket.to(chat === null || chat === void 0 ? void 0 : chat.id).emit("GET_MESSAGE", message);
            }));
        }
        catch (error) {
            socket.emit(ChatEventEnum.SOCKET_ERROR_EVENT, (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong while connecting to the socket.");
        }
    }));
};
exports.initializeSocketIO = initializeSocketIO;
const emitSocketEvent = (req, roomId, event, payload) => {
    req.app.get("io").in(roomId).emit(event, payload);
};
exports.emitSocketEvent = emitSocketEvent;
