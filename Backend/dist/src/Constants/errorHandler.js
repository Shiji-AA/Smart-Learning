"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (res, error) => {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
};
exports.default = errorHandler;
