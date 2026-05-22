"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPrismaRepository = void 0;
class CategoryPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.category.create({
            data
        });
    }
    async findById(id) {
        return await this.prisma.category.findUnique({
            where: { id },
        });
    }
    async findByUserId(userId) {
        return await this.prisma.category.findMany({
            where: {
                OR: [
                    { userId },
                    { userId: 0 }
                ]
            },
            include: {
                _count: {
                    select: { expenses: {
                            where: { userId }
                        } }
                }
            }
        });
    }
    async findAll() {
        return await this.prisma.category.findMany();
    }
    async update(id, data) {
        return await this.prisma.category.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await this.prisma.category.delete({
            where: { id },
        });
    }
}
exports.CategoryPrismaRepository = CategoryPrismaRepository;
