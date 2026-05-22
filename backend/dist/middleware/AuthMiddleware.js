"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const HttpError_1 = require("../Error/HttpError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    throw new HttpError_1.HttpError("Erro interno", 500);
}
class AuthMiddleware {
    constructor() {
        this.auth = (req, res, next) => {
            const token = req.cookies.token;
            if (!token || typeof token !== "string") {
                throw new HttpError_1.HttpError("Invalid token", 401);
            }
            try {
                const response = jsonwebtoken_1.default.verify(token, SECRET_KEY);
                if (!response) {
                    throw new HttpError_1.HttpError("Erro interno", 500);
                }
                req.user = response;
                next();
            }
            catch (error) {
                res.status(401).json({ message: error });
            }
        };
        this.admin = (req, res, next) => {
            if (!req.user) {
                throw new HttpError_1.HttpError("Invalid token", 401);
            }
            if (req.user.role === "admin") {
                next();
            }
            else {
                throw new HttpError_1.HttpError('Admin privileges required', 403);
            }
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
