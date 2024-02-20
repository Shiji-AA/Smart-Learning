// @desc LOGIN student/setToken
// route POST /api/student/login
// access Public


import { Request, Response } from "express";
//
const loginStudent = (req: Request, res: Response) => {
    res.status(200).json({ message: "loginStudent" });
};
//
const registerStudent = (req: Request, res: Response) => {
    res.status(200).json({ message: "registerStudent" });
};
//
const logoutStudent = (req: Request, res: Response) => {
    res.status(200).json({ message: "logoutStudent" });
};
//
const getStudentProfile = (req: Request, res: Response) => {
    res.status(200).json({ message: "getStudentProfile" });
};

//
const updateStudentProfile = (req: Request, res: Response) => {
    res.status(200).json({ message: "updateStudentProfile" });
};
export {
    loginStudent,
    registerStudent,
    logoutStudent,
    getStudentProfile,
    updateStudentProfile
};
