"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserSchema_1 = require("../Schema/UserSchema");
const HttpError_1 = require("../Error/HttpError");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.register = async (req, res, next) => {
            try {
                const data = UserSchema_1.createUserSchema.parse(req.body);
                const user = await this.userService.createUser(data);
                res.cookie("token", user, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: 24 * 60 * 60 * 1000
                });
                return res.status(201).json({ message: "Register sucessfuly" });
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const data = UserSchema_1.loginUserSchema.parse(req.body);
                const user = await this.userService.login(data);
                res.cookie("token", user, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: 24 * 60 * 60 * 1000
                });
                return res.status(200).json({ message: "Login sucessfuly" });
            }
            catch (error) {
                next(error);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                res.clearCookie("token", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                });
                res.json({ message: "Logout realizado com sucesso" });
            }
            catch (error) {
                throw new HttpError_1.HttpError("Internal error", 500);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.user.id);
                const user = await this.userService.getUserById(id);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllUsers = async (req, res, next) => {
            try {
                const query = UserSchema_1.userQuerySchema.parse(req.query);
                const users = await this.userService.getAllUsers(query);
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.user.id);
                const data = UserSchema_1.updateUserSchema.parse(req.body);
                const user = await this.userService.updateUser(id, data);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.user.id);
                const user = await this.userService.deleteUser(id);
                res.json({ message: "Usuário deletado com sucesso", user });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.UserController = UserController;
