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
exports.relistTutor = exports.unlistTutor = exports.getAlltutors = exports.searchTutor = void 0;
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
//get All Tutors
const getAlltutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorDetails = yield tutorModel_1.default.find().exec();
        if (tutorDetails.length > 0) {
            //console.log("Get all tutor details:", tutorDetails);
            res.status(200).json({
                tutorDetails,
                message: "Tutors found",
            });
        }
        else {
            return res.status(404).json({
                message: "No tutors found",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getAlltutors = getAlltutors;
const searchTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchCriteria = req.query.searchCriteria;
        // Validate searchCriteria
        if (!searchCriteria || typeof searchCriteria !== "string") {
            return res.status(400).send("Invalid search criteria");
        }
        const tutorDetails = yield tutorModel_1.default.find({
            $and: [
                { tutorName: { $regex: `^${searchCriteria}`, $options: "i" } }, // Starts with 'a' search
                { tutorName: { $not: { $eq: "Admin" } } }, // Exclude records where name is 'admin' (case-insensitive)
            ],
        });
        res.status(200).json(tutorDetails); // Send the found tutors as a JSON response
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.searchTutor = searchTutor;
//Block the tutor
const unlistTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutor = yield tutorModel_1.default.findById(id);
        if (!tutor) {
            console.log("Tutor not found");
            return res.status(404).json({ message: "Tutor not found" });
        }
        tutor.isBlocked = true;
        yield tutor.save();
        return res
            .status(200)
            .json({ message: "Tutor has been successfully unlisted" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.unlistTutor = unlistTutor;
//unblock the tutor
const relistTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id, "tutorid to unblock");
        const tutor = yield tutorModel_1.default.findById(id);
        if (!tutor) {
            console.log("Tutor not found");
            return res.status(404).json({ message: "Tutor not found" });
        }
        tutor.isBlocked = false; // Setting isBlocked to false to relist the tutor
        yield tutor.save();
        return res
            .status(200)
            .json({ message: "Tutor has been successfully relisted" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.relistTutor = relistTutor;
