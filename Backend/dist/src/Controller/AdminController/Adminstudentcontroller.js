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
exports.relistStudent = exports.unlistStudent = exports.getAllstudents = exports.searchStudent = void 0;
const userModel_1 = __importDefault(require("../../model/userModel"));
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
//get All Students
const getAllstudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentDetails = yield userModel_1.default.find({ __v: { $ne: 1 } }).exec();
        if (studentDetails.length > 0) {
            res.status(200).json({
                studentDetails,
                message: " Students found",
            });
        }
        else {
            return res.status(404).json({
                message: "No students found",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getAllstudents = getAllstudents;
const searchStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchCriteria = req.query.searchCriteria;
        if (!searchCriteria || typeof searchCriteria !== 'string') {
            return res.status(400).send('Invalid search criteria');
        }
        const studentDetails = yield userModel_1.default.find({
            $and: [
                { studentName: { $regex: `^${searchCriteria}`, $options: 'i' } }, // Starts with 'a' search
                { studentName: { $not: { $eq: 'Admin' } } } // Exclude records where name is 'admin' (case-insensitive)
            ]
        });
        res.status(200).json(studentDetails);
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.searchStudent = searchStudent;
//Block the student
const unlistStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield userModel_1.default.findById(id);
        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ message: "Student not found" });
        }
        student.isBlocked = true;
        yield student.save();
        return res.status(200).json({ message: "Student has been successfully unlisted" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.unlistStudent = unlistStudent;
//unblock the student
const relistStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id, "student id to unblock");
        const student = yield userModel_1.default.findById(id);
        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ message: "Student not found" });
        }
        student.isBlocked = false; // Setting isBlocked to false to relist the student
        yield student.save();
        return res.status(200).json({ message: "Student has been successfully relisted" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.relistStudent = relistStudent;
