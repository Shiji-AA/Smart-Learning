import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors'
const app = express();

import connectDB from "./config/db";
dotenv.config(); // This will read your .env file and apply the configurations
const port = process.env.PORT || 3000;

app.use (cors());
import studentRouter from './Routes/StudentRouter/StudentRouter';
connectDB();
   
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/student', studentRouter);


app.get('/', (req, res) => res.send("Hello Server is running"));
    
app.listen(port, () => console.log(`Server started at ${port}`))

   