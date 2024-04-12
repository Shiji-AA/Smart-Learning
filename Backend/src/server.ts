import express from "express";
import * as dotenv from 'dotenv';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors'
const app = express();
import {initializeSocketIO} from '../Utils/socketio'
const httpServer = createServer(app)
dotenv.config(); // This will read your .env file and apply the configurations
const io = new Server(httpServer, {
	pingTimeout: 60000,
	cors: {
		origin: 'http://localhost:4000',
		credentials: true,
	},
})


app.set('io', io)
app.use (cors());
initializeSocketIO(io)

import {connectDB} from "./config/db";


const port = process.env.PORT || 3000;
connectDB();



import studentRouter from './Routes/StudentRouter/StudentRouter';
import adminRouter from "./Routes/AdminRouter/AdminRouter";
import tutorRouter from "./Routes/TutorRouter/TutorRouter";
import paymentRouter from './Routes/PaymentRouter/PaymentRouter';
import chatRouter from "./Routes/ChatRouter/ChatRouter";


   
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tutor',tutorRouter)
app.use('/api/payment', paymentRouter);
app.use('/api/chat',chatRouter);


app.get('/', (req, res) => res.send("Hello Server is running"));
    
httpServer.listen(port, () => console.log(`Server started at ${port}`))

   