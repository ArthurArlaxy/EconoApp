import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../UserRepository";
import { CreateUserInput, UpdateUserInput } from "../../Schema/UserSchema";

export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateUserInput): Promise<User> {
    return await this.prisma.user.create({
      data,
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

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async update(id: number, data: UpdateUserInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
