import { Handler } from "express";
import { CategoryService } from "../Service/CategoryService";
import { createCategorySchema, updateCategorySchema } from "../Schema/CategorySchema";
import { HttpError } from "../Error/HttpError";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    createCategory: Handler = async (req, res, next) => {
        try {
            if (!req.user) throw new HttpError("Invalid token", 401)

            const data = createCategorySchema.parse({
                ...req.body,
                userId: (req.user as any).id
            })

            const category = await this.categoryService.createCategory(data)
            res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    getCategory: Handler = async (req, res, next) => {
        try {
            if (!req.user) throw new HttpError("Invalid token", 401)

            const id = Number(req.params.id)
            const category = await this.categoryService.getCategoryById(id)

            // ← null antes de acessar .userId
            if (!category || category.userId !== (req.user as any).id) {
                throw new HttpError("Forbidden", 403)
            }

            res.json(category)
        } catch (error) {
            next(error)
        }
    }

    getCategoriesByUser: Handler = async (req, res, next) => {
        try {
            if (!req.user) throw new HttpError("Invalid token", 401)

            const userId = (req.user as any).id
            const categories = await this.categoryService.getCategoriesByUserId(userId)
            res.json(categories)
        } catch (error) {
            next(error)
        }
    }

    getAllCategories: Handler = async (req, res, next) => {
        try {
            const categories = await this.categoryService.getAllCategories()
            res.json(categories)
        } catch (error) {
            next(error)
        }
    }

    updateCategory: Handler = async (req, res, next) => {
        try {
            if (!req.user) throw new HttpError("Invalid token", 401)

            const id = Number(req.params.id)
            const categoryExist = await this.categoryService.getCategoryById(id)

            // ← ownership check
            if (!categoryExist || categoryExist.userId !== (req.user as any).id) {
                throw new HttpError("Forbidden", 403)
            }

            const data = updateCategorySchema.parse(req.body)
            const category = await this.categoryService.updateCategory(id, data)
            res.json(category)
        } catch (error) {
            next(error)
        }
    }

    deleteCategory: Handler = async (req, res, next) => {
        try {
            if (!req.user) throw new HttpError("Invalid token", 401)

            const id = Number(req.params.id)
            const categoryExist = await this.categoryService.getCategoryById(id)

            // ← ownership check
            if (!categoryExist || categoryExist.userId !== (req.user as any).id) {
                throw new HttpError("Forbidden", 403)
            }

            const category = await this.categoryService.deleteCategory(id)
            res.json({ message: "Categoria deletada com sucesso", category })
        } catch (error) {
            next(error)
        }
    }
}