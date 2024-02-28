

import { Request, Response } from "express";
import generateToken from "../../../Utils/generateToken";


const adminLogin = async (req: Request, res: Response) => {  
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";
        const id = "ObjectId(65deabd77bad0a47e7fc0f68)";
        const { email, password } = req.body;     
        
        if (adminEmail === email && adminPassword === password) {
            const token = generateToken(id);
            return res.status(200).json({
                id,
                adminEmail,
                token,message :"Logged successfully"             
            });
        } else {
            return res.status(401).json({ message: "Invalid Email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export{
    adminLogin,

}