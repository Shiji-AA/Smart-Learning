"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const socketio_1 = require("../Utils/socketio");
const httpServer = (0, http_1.createServer)(app);
const path_1 = require("path");
dotenv.config(); // This will read your .env file and apply the configurations
const io = new socket_io_1.Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: ['http://localhost:4000', "https://smartlearningofficial.online", "http://localhost:3000"],
        credentials: true,
    },
});
const corsOptions = {
    origin: ['http://localhost:4000', "https://smartlearningofficial.online", "http://localhost:3000"],
    methods: "GET, PUT, POST, PATCH, DELETE"
};
app.set('io', io);
app.use((0, cors_1.default)(corsOptions));
(0, socketio_1.initializeSocketIO)(io);
const db_1 = require("./config/db");
const port = process.env.PORT || 3000;
(0, db_1.connectDB)();
const StudentRouter_1 = __importDefault(require("./Routes/StudentRouter/StudentRouter"));
const AdminRouter_1 = __importDefault(require("./Routes/AdminRouter/AdminRouter"));
const TutorRouter_1 = __importDefault(require("./Routes/TutorRouter/TutorRouter"));
const PaymentRouter_1 = __importDefault(require("./Routes/PaymentRouter/PaymentRouter"));
const ChatRouter_1 = __importDefault(require("./Routes/ChatRouter/ChatRouter"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static((0, path_1.join)(__dirname, "../../../Frontend/dist"))); //this is a static file
app.use('/api/student', StudentRouter_1.default);
app.use('/api/admin', AdminRouter_1.default);
app.use('/api/tutor', TutorRouter_1.default);
app.use('/api/payment', PaymentRouter_1.default);
app.use('/api/chat', ChatRouter_1.default);
app.get("*", function (req, res) {
    res.sendFile((0, path_1.join)(__dirname, "../../../Frontend/dist/index.html")); //
});
app.get('/', (req, res) => res.send("Hello Server is running"));
httpServer.listen(port, () => console.log(`Server started at ${port}`));
