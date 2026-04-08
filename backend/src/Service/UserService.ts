import { HttpError } from "../Error/HttpError";
import { UserRepository } from "../Repository/UserRepository";
import { CreateUserInput, LoginUserInput, UpdateUserInput } from "../Schema/UserSchema";
import bcrypt from "bcrypt"

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserInput) {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new HttpError("User already exists", 400);
    }
    data.password = bcrypt.hashSync(data.password,10)
    return await this.userRepository.create(data);
  }

  async login(data: LoginUserInput){
    const user = await this.userRepository.findByEmail(data.email)
    if(!user || !bcrypt.compareSync(data.password, user.password)){
      throw new HttpError("Invalid Credentials", 400)
    }

    const response = {...user, password: undefined, createdAt: undefined, updatedAt: undefined}
    return response
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

  async getAllUsers() {
    return await this.userRepository.findAll();
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

    if(data.password  && !bcrypt.compareSync(data.password, user.password)){
      data.password = bcrypt.hashSync(data.password,10)
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
