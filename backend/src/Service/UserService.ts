import { HttpError } from "../Error/HttpError";
import { UserRepository } from "../Repository/UserRepository";
import { CreateUserInput, LoginUserInput, UpdateUserInput, UserQuerySchema } from "../Schema/UserSchema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config';
import { Prisma } from "@prisma/client";

const SECRET_KEY = process.env.SECRET_KEY

export class UserService {
  constructor(private userRepository: UserRepository) { }

  async createUser(data: CreateUserInput) {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new HttpError("User already exists", 400);
    }

    data.password = bcrypt.hashSync(data.password, 10)
    data.role = "standard"

    const user = await this.userRepository.create(data);

    const response = { ...user, password: undefined, createdAt: undefined, updatedAt: undefined }

    if (!SECRET_KEY) {
      throw new HttpError("Erro interno", 500);
    }

    const token = jwt.sign(response, SECRET_KEY, { expiresIn: "1d" })
    return token
  }

  async login(data: LoginUserInput) {
    const user = await this.userRepository.findByEmail(data.email)
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new HttpError("Invalid Credentials", 400)
    }

    const response = { ...user, password: undefined, createdAt: undefined, updatedAt: undefined }

    if (!SECRET_KEY) {
      throw new HttpError("Erro interno", 500);
    }

    const token = jwt.sign(response, SECRET_KEY, { expiresIn: "1d" })
    return token
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  }

  async getAllUsers(query: UserQuerySchema) {
    const filter: Prisma.UserWhereInput = {}

    if(query.name){
      filter.name = {
        contains: query.name,
        mode : "insensitive"
      }
    }

    if(query.email){
      filter.email = {
        equals: query.email,
        mode: "insensitive"
      }
    }

    if(query.role){
      filter.role = {
        equals: query.role
      }
    }

    if( query.startDate || query.endDate){
      filter.createdAt = {}
      if (query.startDate) filter.createdAt.gte = query.startDate
      if (query.endDate) filter.createdAt.lte = query.endDate
    }

    const page = query.page || 1
    const pageSize = query.pageSize || 10
    const skip = (page - 1) * pageSize

    return await this.userRepository.findAll(filter, skip, pageSize);
  }

  async updateUser(id: number, data: UpdateUserInput) {
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

    if (data.password && !bcrypt.compareSync(data.password, user.password)) {
      data.password = bcrypt.hashSync(data.password, 10)
    }

    return await this.userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return await this.userRepository.delete(id);
  }
}
