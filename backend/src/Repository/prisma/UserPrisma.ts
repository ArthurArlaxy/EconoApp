import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../UserRepository";
import { CreateUserInput, SafeUserReturn, UpdateUserInput } from "../../Schema/UserSchema";


export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaClient) { }

  async create(data: CreateUserInput): Promise<SafeUserReturn> {
    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<SafeUserReturn[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role:true
      }
    });
  }

  async update(id: number, data: UpdateUserInput): Promise<SafeUserReturn> {
    return await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role:true
      }
    });
  }

  async delete(id: number): Promise<SafeUserReturn> {
    return await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role:true
      }
    });
  }
}
