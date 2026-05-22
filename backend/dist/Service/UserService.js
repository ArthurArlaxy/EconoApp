"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const HttpError_1 = require("../Error/HttpError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(data) {
        const userExists = await this.userRepository.findByEmail(data.email);
        if (userExists) {
            throw new HttpError_1.HttpError("User already exists", 400);
        }
        data.password = bcrypt_1.default.hashSync(data.password, 10);
        data.role = "standard";
        const user = await this.userRepository.create(data);
        const response = { ...user, password: undefined, createdAt: undefined, updatedAt: undefined };
        if (!SECRET_KEY) {
            throw new HttpError_1.HttpError("Erro interno", 500);
        }
        const token = jsonwebtoken_1.default.sign(response, SECRET_KEY, { expiresIn: "1d" });
        return token;
    }
    async login(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user || !bcrypt_1.default.compareSync(data.password, user.password)) {
            throw new HttpError_1.HttpError("Invalid Credentials", 400);
        }
        const response = { ...user, password: undefined, createdAt: undefined, updatedAt: undefined };
        if (!SECRET_KEY) {
            throw new HttpError_1.HttpError("Erro interno", 500);
        }
        const token = jsonwebtoken_1.default.sign(response, SECRET_KEY, { expiresIn: "1d" });
        return token;
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    }
    async getAllUsers(query) {
        const filter = {};
        if (query.name) {
            filter.name = {
                contains: query.name,
                mode: "insensitive"
            };
        }
        if (query.email) {
            filter.email = {
                equals: query.email,
                mode: "insensitive"
            };
        }
        if (query.role) {
            filter.role = {
                equals: query.role
            };
        }
        if (query.startDate || query.endDate) {
            filter.createdAt = {};
            if (query.startDate)
                filter.createdAt.gte = query.startDate;
            if (query.endDate)
                filter.createdAt.lte = query.endDate;
        }
        const page = query.page || 1;
        const pageSize = query.pageSize || 10;
        const skip = (page - 1) * pageSize;
        return await this.userRepository.findAll(filter, skip, pageSize);
    }
    async updateUser(id, data) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        if (data.email && data.email !== user.email) {
            const emailExists = await this.userRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error("Email já está em uso");
            }
        }
        if (data.password && !bcrypt_1.default.compareSync(data.password, user.password)) {
            data.password = bcrypt_1.default.hashSync(data.password, 10);
        }
        return await this.userRepository.update(id, data);
    }
    async deleteUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return await this.userRepository.delete(id);
    }
}
exports.UserService = UserService;
