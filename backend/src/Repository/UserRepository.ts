import { User } from "@prisma/client";
import { CreateUserInput, UpdateUserInput } from "../Schema/UserSchema";

export interface UserRepository {
  create(data: CreateUserInput): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: number, data: UpdateUserInput): Promise<User>;
  delete(id: number): Promise<User>;
}
