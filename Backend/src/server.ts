import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // This will read your .env file and apply the configurations
const port = process.env.PORT || 3000;
import studentRouter from './Routes/StudentRouter/StudentRouter';

const app = express();

app.use('/api/student', studentRouter);


app.get("/", (req, res) => res.send("Hello Server is running"));
    
app.listen(port, () => console.log(`Server started at ${port}`))

