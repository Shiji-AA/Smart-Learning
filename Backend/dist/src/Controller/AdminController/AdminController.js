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
exports.toggleCourseStatus = exports.getAdminCourseList = exports.deleteCategory = exports.editCategory = exports.getCategoryById = exports.getAllCategory = exports.adminLogin = void 0;
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
const generateToken_1 = __importDefault(require("../../../Utils/generateToken"));
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
const courseModel_1 = __importDefault(require("../../model/courseModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "Admin@123";
        const id = new mongoose_1.default.Types.ObjectId("65e6adc6193904154dc390e8");
        const { email, password } = req.body;
        if (adminEmail === email && adminPassword === password) {
            const { token, refreshToken } = (0, generateToken_1.default)(id);
            return res.status(200).json({
                id,
                adminEmail,
                token,
                refreshToken,
                message: "Logged successfully"
            });
        }
        else {
            return res.status(401).json({ message: "Invalid Email or password" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.adminLogin = adminLogin;
//get All Catagories
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryDetails = yield categoryModel_1.default.find().exec();
        if (categoryDetails) {
            //console.log(categoryDetails,"Get all Category")
            res.status(200).json({
                categoryDetails,
                message: "categoryDetails"
            });
        }
        else {
            return res.status(400).json({
                message: "no users in this table",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getAllCategory = getAllCategory;
//to get category details as per id
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        const categoryDetails = yield categoryModel_1.default.findById(categoryId).exec();
        if (categoryDetails) {
            res.status(200).json({
                categoryDetails,
                message: "Category found successfully",
            });
        }
        else {
            return res.status(404).json({
                message: "Category not found",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getCategoryById = getCategoryById;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //console.log(id,"iddd")
        const { title, description } = req.body;
        const category = yield categoryModel_1.default.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Invalid category" });
        }
        category.title = title || category.title;
        category.description = description || category.description;
        const updateCategory = yield category.save();
        if (updateCategory) {
            return res.status(200).json({ message: "Category updated successfully" });
        }
        else {
            return res.status(404).json({ error: "Failed to update category" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.editCategory = editCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categoryModel_1.default.findById(id);
        if (!category) {
            return res.status(400).json({ error: "Category not found" });
        }
        yield categoryModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "category deleted successfully" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.deleteCategory = deleteCategory;
const getAdminCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseDetails = yield courseModel_1.default.find().exec();
        //console.log(courseDetails,"i am")
        if (courseDetails) {
            res.status(200).json({
                courseDetails, message: "CourseDetails"
            });
        }
        else {
            return res.status(400).json({
                error: "no course available"
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getAdminCourseList = getAdminCourseList;
//For admin approval of course
const toggleCourseStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield courseModel_1.default.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        course.isApproved = !course.isApproved;
        yield course.save();
        return res.status(200).json({ message: 'Course status toggled successfully', course });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.toggleCourseStatus = toggleCourseStatus;
