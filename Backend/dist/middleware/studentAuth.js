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
exports.isLogin = void 0;
const userModel_1 = __importDefault(require("../src/model/userModel"));
const tutorModel_1 = __importDefault(require("../src/model/tutorModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized - No token found' });
        }
        const token = authorizationHeader.split(' ')[1];
        //console.log(token,"token")
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token found' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let user = yield findUser(decoded.user_id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - No token found' });
        }
        if (user.isBlocked) {
            return res.status(401).json({ error: 'Unauthorized - Account is blocked' });
        }
        req.user = user; //to verify if a user is logged in and attach user information to the request object if the user is authenticated.
        //console.log(user,"user")
        next();
    }
    catch (error) {
        console.error('Error in isLogin middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.isLogin = isLogin;
const findUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.default.findById(userId);
    if (!user) {
        user = yield tutorModel_1.default.findById(userId);
    }
    return user;
});
