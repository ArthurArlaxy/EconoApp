import { UserRepository } from "../Repository/UserRepository";
import { CreateUserInput, UpdateUserInput } from "../Schema/UserSchema";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserInput) {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error("Usuário com este email já existe");
    }
    return await this.userRepository.create(data);
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
