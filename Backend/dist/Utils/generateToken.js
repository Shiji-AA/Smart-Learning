"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//console.log(process.env.JWT_SECRET,"env")
const generateToken = (user_id) => {
    // Generate token with a 2-day expiration time   
    const token = jsonwebtoken_1.default.sign({ user_id }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    });
    // Generate Refresh token with a 5-day expiration time
    const refreshToken = jsonwebtoken_1.default.sign({ user_id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '5d'
    });
    return { token, refreshToken };
};
exports.default = generateToken;
