import { Prisma, User } from "@prisma/client";
import { CreateUserInput, SafeUserReturn, UpdateUserInput, UserQuerySchema } from "../Schema/UserSchema";

export interface UserRepository {
  create(data: CreateUserInput): Promise<SafeUserReturn>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(query: Prisma.UserWhereInput, skip:number, pageSize: number): Promise<SafeUserReturn[]>;
  update(id: number, data: UpdateUserInput): Promise<SafeUserReturn>;
  delete(id: number): Promise<SafeUserReturn>;
}
