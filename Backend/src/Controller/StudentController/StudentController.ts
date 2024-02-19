// @desc LOGIN student/setToken
// route POST /api/student/login
// access Public

import { Request, Response } from 'express';

const loginStudent = (req: Request, res: Response) => {
    res.status(200).json({ message: 'loginStudent' });
}

export {
    loginStudent
};
