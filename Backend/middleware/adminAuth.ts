import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import studentModel, { Student } from "../src/model/userModel";

interface DecodeToken {
  user_id: string;
}
 const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      throw new Error("Authorization header missing");
    }   
    const decodedToken: JwtPayload | any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    let user = await findUser("65e6adc6193904154dc390e8");
    if (!user) {
      throw new Error("User not found");
    }
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, Invalid Token" });
  }
};

const findUser = async (userId: string) => {
  let user = await studentModel.findById(userId);
  return user;
};
