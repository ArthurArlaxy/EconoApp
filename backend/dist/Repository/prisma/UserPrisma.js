"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaRepository = void 0;
class UserPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
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
    async findById(id) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }
    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findAll(filter, skip, pageSize) {
        return await this.prisma.user.findMany({
            where: filter,
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            },
            skip,
            take: pageSize
        });
    }
    async update(id, data) {
        return await this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });
    }
    async delete(id) {
        return await this.prisma.user.delete({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });
    }
}
exports.UserPrismaRepository = UserPrismaRepository;
