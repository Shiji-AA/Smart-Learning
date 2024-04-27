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
exports.fetchChatss = exports.quizList = exports.getAllCategoryStudent = exports.createRefreshToken = exports.filterCourse = exports.updateLessonCompletedStatus = exports.getUsersForSidebar = exports.removeWishlistItem = exports.getWishlistItem = exports.addWishlistItem = exports.searchTutorStudent = exports.tutorsList = exports.searchCourse = exports.getAllLessons = exports.enrolledcourseSingleview = exports.enrolledcourses = exports.getCourseDetails = exports.userCourseList = exports.updateProfile = exports.getProfileById = exports.resetPassword = exports.verifyOTP = exports.sendOTP = exports.googleLogin = exports.googleRegister = exports.getStudentProfile = exports.registerStudent = exports.loginStudent = void 0;
const userModel_1 = __importDefault(require("../../model/userModel"));
const courseModel_1 = __importDefault(require("../../model/courseModel"));
const generateToken_1 = __importDefault(require("../../../Utils/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const orderModel_1 = __importDefault(require("../../model/orderModel"));
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const wishlistModel_1 = __importDefault(require("../../model/wishlistModel"));
const wishlistModel_2 = __importDefault(require("../../model/wishlistModel"));
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
const quizModel_1 = __importDefault(require("../../model/quizModel"));
const chatModel_1 = __importDefault(require("../../model/chatModel"));
const globalData = {
    user: null,
};
// @desc Register A new user
//route POST /api/users
//access  Public
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone } = req.body;
        //console.log("body data",req.body)
        const userExist = yield userModel_1.default.findOne({ email });
        const userphone = yield userModel_1.default.findOne({ phone });
        if (userExist) {
            return res
                .status(400)
                .json({ error: "User with this email already exists" });
        }
        if (userphone) {
            return res
                .status(400)
                .json({ error: "User with this phone number already exists" });
        }
        const newUser = new userModel_1.default({
            studentName: name,
            studentEmail: email,
            phone,
            password,
        });
        yield newUser.save();
        // Store user information in globalData if registration is successful
        globalData.user = {
            studentName: name,
            studentEmail: email,
            phone,
        };
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.registerStudent = registerStudent;
//googleREGISTER
const googleRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("This is credential in body: ", req.body.credential);
        const token = req.body.credential;
        const decodedData = jsonwebtoken_1.default.decode(req.body.credential);
        console.log("Decoded data: ", decodedData);
        // Assuming decodedData is of type 'string | JwtPayload | null'
        const { name, email, picture, jti, } = decodedData;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = new userModel_1.default({
            studentName: name,
            studentEmail: email,
            photo: picture,
            password: jti,
        });
        yield newUser.save();
        res.status(200).json({ message: "user saved successfully" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.googleRegister = googleRegister;
//googleLogin
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedData = jsonwebtoken_1.default.decode(req.body.credential);
        if (!decodedData) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const { name, email, picture, jti } = decodedData;
        const user = yield userModel_1.default.findOne({ studentEmail: email });
        if (user) {
            const { token, refreshToken } = (0, generateToken_1.default)(user._id);
            user.refreshToken = refreshToken;
            yield user.save();
            const userData = {
                name: user.studentName,
                email: user.studentEmail,
                id: user._id,
                phone: user.phone,
                image: user.photo,
                role: user.studentRole
            };
            return res.json({
                userData,
                token,
                refreshToken,
                message: "Success",
            });
        }
        else {
            return res.status(401).json({ error: "Invalid Email and Password" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.googleLogin = googleLogin;
// @desc LOGIN student/setToken
// route POST /api/student/login
// access Public
const loginStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({
            studentEmail: email,
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid user " });
        }
        if (user.isBlocked) {
            return res.status(401).json({ error: "User is blocked" });
        }
        if (user && (yield user.matchPassword(password))) {
            const userData = {
                name: user.studentName,
                email: user.studentEmail,
                id: user._id,
                phone: user.phone,
                image: user.photo,
            };
            //generate Token & RefreshToken & save refreshToken in db
            const { token, refreshToken } = (0, generateToken_1.default)(user._id);
            user.refreshToken = refreshToken;
            yield user.save();
            return res.json({
                userData,
                token,
                refreshToken,
                message: "success",
            });
        }
        else {
            return res.status(401).json({ error: "Invalid Email and Password" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.loginStudent = loginStudent;
//SENT OTP BUTTON
var otpCode;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let email = req.body.email;
        otpCode = Math.floor(1000 + Math.random() * 9000).toString();
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "shijihcl@gmail.com",
                pass: "tsqb ondk qqqb zgia",
            },
        });
        const mailOptions = {
            from: "shijihcl@gmail.com",
            to: email,
            subject: "Verification Code",
            text: `Your OTP code is: ${otpCode}`,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error("Error sending email: ", err);
                return res.status(500).json({ message: "Failed to send OTP email" });
            }
            else {
                console.log("Email sent: " + info.response);
                return res.status(200).json({ email, message: "OTP sent successfully" });
            }
        });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.sendOTP = sendOTP;
//verify Button
var verified;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    verified = false;
    try {
        const enteredOTP = req.body.otp;
        if (enteredOTP == otpCode) {
            verified = true;
            res.status(200).json({ message: "Success" });
        }
        else {
            res.status(404).json({ error: "Invalid OTP" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.verifyOTP = verifyOTP;
//reset password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newpassword, confirmpassword, email } = req.body;
        // You can directly use the `email` variable here
        const user = yield userModel_1.default.findOne({
            studentEmail: email,
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid user" });
        }
        if (newpassword !== confirmpassword) {
            return res.status(400).json({ error: "New password and confirm password do not match" });
        }
        if (user) {
            const hashedPassword = yield bcrypt_1.default.hash(newpassword, 10);
            yield userModel_1.default.findOneAndUpdate({ studentEmail: email }, { password: hashedPassword });
            // Clear the OTP code after resetting the password
            otpCode = undefined;
        }
        return res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.resetPassword = resetPassword;
//to get student profile
const getStudentProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user; //from middleware   
        const userData = yield userModel_1.default.findOne({ _id: user._id });
        if (!userData) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ userData });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getStudentProfile = getStudentProfile;
//to get data in the editprofile page
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const studentDetails = yield userModel_1.default.findById(user._id).exec();
        if (studentDetails) {
            res.status(200).json({
                studentDetails,
                message: "Student found successfully",
            });
        }
        else {
            return res.status(404).json({
                message: "Student not found",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getProfileById = getProfileById;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user, "user"); //from middleware
        const { studentName, studentEmail, phone, photo } = req.body;
        const student = yield userModel_1.default.findById(user._id);
        if (!student) {
            return res.status(404).json({ error: "Invalid category" });
        }
        student.studentName = studentName || student.studentName;
        student.studentEmail = studentEmail || student.studentEmail;
        student.phone = phone || student.phone;
        student.photo = photo;
        const updateStudentData = yield student.save();
        //updating store 
        const userData = {
            name: updateStudentData.studentName,
            email: updateStudentData.studentEmail,
            id: updateStudentData._id,
            phone: updateStudentData.phone,
            image: updateStudentData.photo,
            //photo : updateStudentData.photo,
        };
        console.log(updateStudentData);
        if (updateStudentData) {
            return res.status(200).json({ userData, message: "Student updated successfully" });
        }
        else {
            return res.status(404).json({ error: "Failed to update student" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.updateProfile = updateProfile;
const userCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseDetails = yield courseModel_1.default.find({ isApproved: true }).exec();
        //console.log(courseDetails,"iam COURSEDETAILS")
        if (courseDetails && courseDetails.length > 0) {
            res.status(200).json({ courseDetails, message: "Course Details" });
        }
        else {
            return res.status(400).json({ error: "no course available" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.userCourseList = userCourseList;
//getCourseDetails by Id
const getCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const courseDetails = yield courseModel_1.default.findById(courseId);
        if (courseDetails) {
            res.status(200).json({ courseDetails, message: "course details retrieved" });
        }
        else {
            return res.status(404).json({ error: "No course found" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getCourseDetails = getCourseDetails;
const enrolledcourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        //console.log(user,"user") //from middleware
        const studentId = user._id;
        const enrolledCourses = yield orderModel_1.default.find({ studentId: studentId }).populate('courseId');
        //console.log(enrolledCourses, "enrolled courses");  
        res.status(200).json({ enrolledCourses, message: "enrolledCourses" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.enrolledcourses = enrolledcourses;
//for EnrolledSinglePageView
const enrolledcourseSingleview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        console.log(courseId, "courseId");
        const singleViewDetails = yield courseModel_1.default.findOne({ _id: courseId });
        //console.log(singleViewDetails,"singleViewDetails")
        if (!singleViewDetails) {
            return res.status(404).json({ error: "No orders found for the course" });
        }
        res.status(200).json({ singleViewDetails, message: "SingleCourseDetails" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.enrolledcourseSingleview = enrolledcourseSingleview;
//for EnrolledSinglePageView
const getAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const lessonDetails = yield courseModel_1.default.findById(courseId).populate({
            path: 'lessons'
        });
        if (!lessonDetails) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        //console.log(lessonDetails, "Lesson Details");
        res.status(200).json({ lessonDetails, message: "Lesson details fetched successfully" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getAllLessons = getAllLessons;
//for searching course from Home page
const searchCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchCriteria = req.query.searchCriteria;
        if (!searchCriteria || typeof searchCriteria !== 'string') {
            return res.status(400).send('Invalid search criteria');
        }
        const courseDetails = yield courseModel_1.default.find({
            $and: [
                { courseName: { $regex: `^${searchCriteria}`, $options: 'i' } }, // Starts with 'a' search
            ]
        });
        //console.log(courseDetails,"courseDetails");
        res.status(200).json(courseDetails);
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.searchCourse = searchCourse;
const tutorsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorDetails = yield tutorModel_1.default.find().exec();
        //console.log(tutorDetails,"tutordetails")
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
exports.tutorsList = tutorsList;
const searchTutorStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchCriteria = req.query.searchCriteria;
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
exports.searchTutorStudent = searchTutorStudent;
const addWishlistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //console.log(id, "id"); // courseId    
        const existingItem = yield wishlistModel_1.default.findOne({ course: id });
        if (existingItem) {
            // If the course already exists in the wishlist, send a message indicating that it's already added
            return res.status(400).json({ error: 'Course is already added to wishlist' });
        }
        // If the course doesn't exist in the wishlist, create a new wishlist item
        const newWishlistItem = new wishlistModel_1.default({ course: id, isWishlisted: true });
        yield newWishlistItem.save();
        console.log(newWishlistItem, "New Wishlist Item");
        // Send success response
        res.status(201).json({ message: 'Course added to wishlist successfully', data: newWishlistItem });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.addWishlistItem = addWishlistItem;
const getWishlistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlistedCourses = yield wishlistModel_2.default.find().populate('course');
        //console.log(wishlistedCourses,"wishlistedCourses")
        res.status(200).json({ wishlistedCourses, message: "wishlistedCourses" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getWishlistItem = getWishlistItem;
const removeWishlistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    try {
        const deletedItem = yield wishlistModel_2.default.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: "Wishlist item not found" });
        }
        res.status(200).json({ message: "Wishlist item removed successfully", deletedItem });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.removeWishlistItem = removeWishlistItem;
const getUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userModel_1.default.find({ __v: { $ne: 1 } }).select("-password");
        res.status(200).json({ allUsers, message: "allUsers" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getUsersForSidebar = getUsersForSidebar;
const updateLessonCompletedStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        yield courseModel_1.default.findByIdAndUpdate(courseId, { isLessonCompleted: true });
        res.status(200).json({ message: 'Lesson completion status updated successfully.' });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.updateLessonCompletedStatus = updateLessonCompletedStatus;
//FILTER COURSE
const filterCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filteredCourses;
        if (req.query && req.query.category !== "All") {
            const category = yield categoryModel_1.default.findOne({ title: req.query.category });
            if (!category) {
                filteredCourses = [];
            }
            else {
                filteredCourses = yield courseModel_1.default.find({ category: category._id }).populate("category");
            }
        }
        else {
            filteredCourses = yield courseModel_1.default.find().populate("category");
        }
        //console.log(filteredCourses, "Filtered courses");
        res.status(200).json({ filteredCourses, message: "Filtered courses" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.filterCourse = filterCourse;
const createRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        console.log(refreshToken, "refresh Token");
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = yield userModel_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded._id);
        if (!user || user.refreshToken !== refreshToken) {
            throw new Error('Invalid refresh token');
        }
        // Generate a new access token
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
        return token;
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.createRefreshToken = createRefreshToken;
//get All Catagories
const getAllCategoryStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getAllCategoryStudent = getAllCategoryStudent;
const quizList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        //console.log(courseId)
        const allQuizSets = yield quizModel_1.default.find({ courseId: courseId });
        console.log(allQuizSets, "allQuizSet");
        res.status(200).json({ message: "quizList", allQuizSets });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.quizList = quizList;
//fetch all chats to a particular user
const fetchChatss = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //    console.log("message sent",req.params.id)
    try {
<<<<<<< HEAD
        const { id } = req.params; //TutorId
        console.log(id, "tutorId");
=======
        const { id } = req.params; //studentId
        console.log(id, "id");
>>>>>>> 021cb3e7de417808a40dc7335f109caede8ba111
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; //tutorId   
        //console.log(id, senderId,"jjj")
        const chat = yield chatModel_1.default.findOne({
            participants: { $all: [senderId, id] },
        }).populate("messages");
        if (!chat) {
            return res.status(200).json([]);
        }
        ;
        //console.log(chat?.messages, "chat")
        const messageData = chat.messages;
        console.log(messageData, "messageData");
        res.status(200).json({ messageData, message: "ChatMessages" });
    }
    catch (error) {
        console.error("Error in fetchChats:", error);
        res.status(500).json({ error, message: "Error while fetching messages" });
    }
});
exports.fetchChatss = fetchChatss;
