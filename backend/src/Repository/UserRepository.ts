import { User } from "@prisma/client";
import { CreateUserInput, SafeUserReturn, UpdateUserInput } from "../Schema/UserSchema";

export interface UserRepository {
  create(data: CreateUserInput): Promise<SafeUserReturn>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<SafeUserReturn[]>;
  update(id: number, data: UpdateUserInput): Promise<SafeUserReturn>;
  delete(id: number): Promise<SafeUserReturn>;
}
