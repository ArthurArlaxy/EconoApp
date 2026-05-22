"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensePrismaRepository = void 0;
class ExpensePrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.expense.create({
            data
        });
    }
    async createMany(data) {
        return await this.prisma.$transaction(data.map(expense => this.prisma.expense.create({
            data: expense
        })));
    }
    async findById(id) {
        return await this.prisma.expense.findUnique({
            where: { id },
            include: { category: true }
        });
    }
    async findByUserId(userId, filter, pageSize, skip) {
        const [expenses, total] = await this.prisma.$transaction([
            this.prisma.expense.findMany({
                where: { userId, ...filter },
                include: { category: true },
                skip,
                take: pageSize
            }),
            this.prisma.expense.aggregate({
                where: { userId, ...filter },
                _sum: { value: true },
                _count: { id: true }
            })
        ]);
        return {
            expenses,
            total: total._count.id,
            totalValue: Number(total._sum.value) || 0
        };
    }
    async findAll(filter, pageSize, skip) {
        return await this.prisma.expense.findMany({
            where: filter,
            orderBy: { name: "desc" },
            skip,
            take: pageSize
        });
    }
    async update(id, data) {
        return await this.prisma.expense.update({
            where: { id },
            data: {
                ...data,
                ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
            },
        });
    }
    async delete(id) {
        return await this.prisma.expense.delete({
            where: { id },
        });
    }
}
exports.ExpensePrismaRepository = ExpensePrismaRepository;
