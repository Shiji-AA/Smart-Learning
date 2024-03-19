import { Request, Response, NextFunction } from 'express';
import studentModel from '../src/model/userModel';
import TutorModel from '../src/model/tutorModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken {
    user_id: string;
}
export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized - No token found' });
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token found' });
        }     
        const decoded: JwtPayload | any = jwt.verify(token, process.env.JWT_SECRET as string);
        let user = await findUser(decoded.user_id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }
        if (user.isBlocked) {
            return res.status(401).json({ error: 'Unauthorized - Account is blocked' });
        }
        (req as any).user = user;  //to verify if a user is logged in and attach user information to the request object if the user is authenticated.
        //console.log(user,"userrrr")
        next();
    } catch (error) {
        console.error('Error in isLogin middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const findUser = async (userId: string) => {
    let user = await studentModel.findById(userId);
    if (!user) {
        user = await TutorModel.findById(userId);
    }
    return user;
};
