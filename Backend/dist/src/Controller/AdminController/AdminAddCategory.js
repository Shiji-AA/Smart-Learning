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
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
const errorHandler_1 = __importDefault(require("../../Constants/errorHandler"));
//addcategory
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const categoryExist = yield categoryModel_1.default.findOne({
            title: { $regex: new RegExp(title, 'i') },
        });
        if (categoryExist) {
            console.log('Category already exists');
            return res.status(400).json({ message: 'Category already exists' });
        }
        const newCategory = yield categoryModel_1.default.create({
            title,
            description,
        });
        if (newCategory) {
            console.log(title, 'new Title');
            res.status(201).json({
                title,
                description,
                message: "Category added successfully"
            });
        }
        else {
            res.status(400).json({ error: 'Invalid category data' });
        }
    }
    catch (error) {
        return (0, errorHandler_1.default)(res, error);
    }
});
exports.default = addCategory;
