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
exports.filterCourseTutor = exports.fetchChats = exports.getAllQuestions = exports.removeQuiz = exports.activateQuiz = exports.addQuiz = exports.createRefreshToken = exports.enrolledStudentData = exports.tutorAllLessons = exports.updateLesson = exports.editLesson = exports.updateCourse = exports.editCourse = exports.updateProfile = exports.getProfileById = exports.singleView = exports.addLesson = exports.getAllCourse = exports.addCourse = exports.getTutorProfile = exports.registerTutor = exports.tutorLogin = void 0;
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const generateToken_1 = __importDefault(require("../../../Utils/generateToken"));
const courseModel_1 = __importDefault(require("../../model/courseModel"));
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
const lessonModel_1 = __importDefault(require("../../model/lessonModel"));
const orderModel_1 = __importDefault(require("../../model/orderModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notificationModel_1 = __importDefault(require("../../model/notificationModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
const quizModel_1 = __importDefault(require("../../model/quizModel"));
const chatModel_1 = __importDefault(require("../../model/chatModel"));
const registerTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorName, tutorEmail, password, education, experience, onlineavailability, phone } = req.body;
        //console.log(req.body, "i am tutor");
        const tutorExist = yield tutorModel_1.default.findOne({ tutorEmail: tutorEmail });
        const phoneExist = yield tutorModel_1.default.findOne({ phone: phone });
        if (tutorExist || phoneExist) {
            return res.status(400).json({ error: "User Already Exist" });
        }
        const tutor = yield tutorModel_1.default.create({
            tutorName,
            tutorEmail,
            password,
            education,
            experience,
            onlineavailability,
            phone,
        });
        if (tutor) {
            const tutorData = {
                tutorName: tutor.tutorName,
                tutorEmail: tutor.tutorEmail,
                phone: tutor.phone,
                education: tutor.education,
                experience: tutor.experience,
                onlineavailability: tutor.onlineavailability,
                tutorId: tutor._id,
            };
            return res.status(201).json({
                message: "Tutor Registered Successfully",
            });
        }
        else {
            return res.status(400).json({ error: "Invalid Tutor Details" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.registerTutor = registerTutor;
const tutorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutorEmail, password } = req.body;
    try {
        const tutor = yield tutorModel_1.default.findOne({ tutorEmail: tutorEmail });
        if (!tutor) {
            return res.status(400).json({ error: "No Tutor Found" });
        }
        if (tutor.isBlocked) {
            return res.status(401).json({ error: "User is blocked" });
        }
        if (tutor && (yield tutor.matchPassword(password))) {
            //generate a jwt
            const tutorData = {
                tutorName: tutor.tutorName,
                tutorEmail: tutor.tutorEmail,
                phone: tutor.phone,
                tutorId: tutor._id,
                image: tutor.photo,
            };
            const { token, refreshToken } = (0, generateToken_1.default)(tutor._id);
            tutor.refreshToken = refreshToken;
            yield tutor.save();
            return res.status(200).json({
                tutorData,
                token,
                refreshToken,
                message: "Login Success",
            });
        }
        else {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.tutorLogin = tutorLogin;
const getTutorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutor = req.user;
        const tutorData = yield tutorModel_1.default.findOne({ _id: tutor._id });
        //console.log(tutorData, "tutordata");
        if (!tutorData) {
            return res.status(404).json({ error: "Tutor not found" });
        }
        return res.status(200).json({ tutorData });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getTutorProfile = getTutorProfile;
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseName, courseDuration, courseDescription, courseFee, selectcategory, selecttutor, image } = req.body;
        const categoryExist = yield categoryModel_1.default.findById(selectcategory);
        if (!categoryExist) {
            return res.status(400).json({ error: "Category does not exist" });
        }
        const courseExist = yield courseModel_1.default.findOne({
            courseName: { $regex: new RegExp("^" + courseName + "$", "i") }, // Match exact courseName
        });
        if (courseExist) {
            return res.status(400).json({ error: "Course already exists" });
        }
        const newCourse = yield courseModel_1.default.create({
            courseName, courseDuration, courseDescription, courseFee, category: selectcategory, tutor: selecttutor, photo: image,
        });
        if (newCourse) {
            //Creating a notification to admin
            const notification = yield notificationModel_1.default.create({
                senderUser: req.user,
                receiverUser: new mongoose_1.default.Types.ObjectId("65e6adc6193904154dc390e8"),
                message: `New course : '${courseName}' has been added`,
                type: 'Pending for Approval',
                isRead: false,
            });
            return res.status(201).json({ courseName, courseDescription, courseFee, courseDuration, selectcategory, selecttutor, image,
                message: "Course added successfully",
            });
        }
        else {
            return res.status(400).json({
                error: "Invalid course data",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.addCourse = addCourse;
//to get data in the edit course page
const editCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const courseDetails = yield courseModel_1.default.findById(courseId).exec();
        if (courseDetails) {
            res.status(200).json({
                courseDetails,
                message: "courseDetails found successfully",
            });
        }
        else {
            return res.status(404).json({
                message: "Course not found",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.editCourse = editCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const updatedCourseData = req.body;
        //console.log(updatedCourseData, "updated data");
        const course = yield courseModel_1.default.findByIdAndUpdate(courseId, { $set: updatedCourseData }, { new: true });
        if (course) {
            res.status(200).json({
                course,
                message: "Course Updated Successfully",
            });
        }
        else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.updateCourse = updateCourse;
const getAllCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutor = req.params.tutorId;
        console.log(tutor, "tutorId");
        const courseDetails = yield courseModel_1.default.find({ tutor: tutor }).exec();
        console.log(courseDetails, "courseDetails");
        if (!courseDetails.length) {
            return res.status(400).json({
                error: "No course available "
            });
        }
        else {
            return res.status(200).json({
                courseDetails,
                message: "courseDetails"
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getAllCourse = getAllCourse;
const singleView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const courseDetails = yield courseModel_1.default.findById(courseId);
        if (courseDetails) {
            res.status(200).json({
                courseDetails,
                message: "Course details retrieved",
            });
        }
        else {
            return res.status(400).json({
                error: "No course available ",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.singleView = singleView;
const addLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, selectcategory, selectcourse, video, } = req.body;
        const categoryExist = yield categoryModel_1.default.findById(selectcategory);
        if (!categoryExist) {
            return res.status(400).json({ error: "Category does not exist" });
        }
        const courseExist = yield courseModel_1.default.findById(selectcourse);
        if (!courseExist) {
            return res.status(400).json({ error: "Course does not exist" });
        }
        const newLesson = yield lessonModel_1.default.create({
            title,
            description,
            categoryId: selectcategory,
            courseId: selectcourse,
            video,
        });
        yield courseModel_1.default.findByIdAndUpdate(selectcourse, {
            $push: { lessons: newLesson._id },
        });
        if (newLesson) {
            return res.status(201).json({
                title,
                description,
                selectcategory,
                selectcourse,
                video,
                message: "Lesson added successfully",
            });
        }
        else {
            return res.status(400).json({
                error: "Failed to add lesson. Please check your data.",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.addLesson = addLesson;
//to get data in the editprofile page
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = req.user;
    console.log(tutor, "tutor");
    try {
        const tutorDetails = yield tutorModel_1.default.findById(tutor._id).exec();
        if (tutorDetails) {
            res.status(200).json({
                tutorDetails,
                message: "Tutor found successfully",
            });
        }
        else {
            return res.status(404).json({
                message: "Tutor not found",
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
        const tutor1 = req.user;
        const { tutorName, tutorEmail, phone, education, experience, onlineavailability, photo } = req.body;
        const tutor = yield tutorModel_1.default.findById(tutor1._id);
        if (!tutor) {
            return res.status(404).json({ error: "Invalid category" });
        }
        tutor.tutorName = tutorName || tutor.tutorName;
        tutor.tutorEmail = tutorEmail || tutor.tutorEmail;
        tutor.phone = phone || tutor.phone;
        tutor.education = education || tutor.education;
        tutor.experience = experience || tutor.experience;
        tutor.onlineavailability = onlineavailability || tutor.onlineavailability;
        tutor.photo = photo;
        const updateTutorData = yield tutor.save();
        //this is  sending along with response so that update the store
        const tutorData = {
            tutorName: updateTutorData.tutorName,
            tutorEmail: updateTutorData.tutorEmail,
            phone: updateTutorData.phone,
            education: updateTutorData.education,
            experience: updateTutorData.experience,
            onlineavailability: updateTutorData.onlineavailability,
            image: updateTutorData.photo,
            tutorId: updateTutorData._id,
        };
        if (updateTutorData) {
            return res
                .status(200)
                .json({ tutorData, message: "Tutor updated successfully" });
        }
        else {
            return res.status(404).json({ error: "Failed to update tutor" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.updateProfile = updateProfile;
const tutorAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        // Fetch course details
        const courseDetails = yield courseModel_1.default.findById(courseId);
        if (!courseDetails) {
            return res.status(404).json({ error: "Course not found" });
        }
        // Fetch lesson details associated with the course
        const lessonIds = courseDetails.lessons;
        const lessonDetails = yield lessonModel_1.default.find({ _id: { $in: lessonIds } });
        //console.log(lessonDetails, "Lesson Details");
        // Send response with lesson details
        res.status(200).json({ lessonDetails, message: "lessonDetails" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.tutorAllLessons = tutorAllLessons;
//to fetch the data to editLessonPage
const editLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonId = req.params.id;
        const lessonDetails = yield lessonModel_1.default.findById(lessonId);
        if (lessonDetails) {
            return res
                .status(200)
                .send({ lessonDetails, message: "lessonDetails are found" });
        }
        else {
            return res.status(404).json({
                message: "Tutor not found",
            });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.editLesson = editLesson;
//To update the lesson
const updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonId = req.params.id;
        const updatedLessonData = req.body;
        //console.log(lessonId,"lessonId");
        const newLessonData = yield lessonModel_1.default.findByIdAndUpdate(lessonId, { $set: updatedLessonData }, { new: true });
        if (newLessonData) {
            res
                .status(200)
                .json({ newLessonData, message: "Lesson updated successfully" });
        }
        else {
            res.status(404).json({ error: "Lesson not found" });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.updateLesson = updateLesson;
//for getting enrolled student Details
const enrolledStudentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = req.user;
    console.log(tutor, "Tutor");
    try {
        const tutorId = tutor._id;
        //console.log(tutorId);
        const enrolledStudentDetails = yield orderModel_1.default
            .find({ tutorId: tutorId })
            .populate("studentId")
            .populate("courseId")
            .exec();
        //console.log(enrolledStudentDetails, "enrolledStudentDetails");
        res.status(200).json({ enrolledStudentDetails, message: "enrolledStudentDetails" });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.enrolledStudentData = enrolledStudentData;
const createRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        console.log(refreshToken, "refresh Token");
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const tutor = yield tutorModel_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded._id);
        if (!tutor || tutor.refreshToken !== refreshToken) {
            throw new Error('Invalid refresh token');
        }
        // Generate a new access token
        const token = jsonwebtoken_1.default.sign({ _id: tutor._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        return token;
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.createRefreshToken = createRefreshToken;
const addQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionset, courseId, count } = req.body;
    //console.log(req.body,"req.body");
    try {
        const existQuiz = yield quizModel_1.default.find({ courseId: courseId });
        if (existQuiz.length === 0) {
            // If no quiz exists for the course, create a new one
            const newQuiz = yield quizModel_1.default.create({
                courseId: courseId,
                questionset,
            });
            // Update the course document with the number of quiz questions
            yield courseModel_1.default.findByIdAndUpdate(courseId, { quizQuestions: count });
            res.status(201).json({ newQuiz, message: "new quiz  added" });
        }
        else {
            // If a quiz already exists for the course, update the existing quiz
            const numberOfQuestionSets = existQuiz[0].questionset.length;
            const updateQuizSet = yield quizModel_1.default.findOneAndUpdate({ courseId: courseId }, { $push: { questionset: { $each: questionset } } }, { new: true });
            // Update the course document with the new number of quiz questions
            yield courseModel_1.default.findByIdAndUpdate(courseId, { quizQuestions: numberOfQuestionSets });
            res.status(201).json(updateQuizSet);
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.addQuiz = addQuiz;
const activateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quiz = yield quizModel_1.default.findOneAndUpdate({ "questionset._id": id }, { $set: { "questionset.$.isActive": true } }, { new: true });
        if (quiz) {
            res.status(201).json({
                _id: quiz._id,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.activateQuiz = activateQuiz;
const removeQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quiz = yield quizModel_1.default.findOneAndUpdate({ "questionset._id": id }, { $set: { "questionset.$.isActive": false } }, { new: true });
        if (quiz) {
            res.status(201).json({
                _id: quiz._id,
            });
        }
        else {
            res.status(404).json({ error: "Quiz not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.removeQuiz = removeQuiz;
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionDetails = yield quizModel_1.default.find();
        res.status(200).json({ message: "questionDetails", questionDetails });
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.getAllQuestions = getAllQuestions;
//fetch all chats to a particular Tutor
const fetchChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params; //studentId
        // console.log(id, "StudentId")
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
        //console.log(messageData,"messageData")
        res.status(200).json({ messageData, message: "ChatMessages" });
    }
    catch (error) {
        console.error("Error in fetchChats:", error);
        res.status(500).json({ error, message: "Error while fetching messages" });
    }
});
exports.fetchChats = fetchChats;
//FILTER COURSE
const filterCourseTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.filterCourseTutor = filterCourseTutor;
