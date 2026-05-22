"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const CategorySchema_1 = require("../Schema/CategorySchema");
const HttpError_1 = require("../Error/HttpError");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.createCategory = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const data = CategorySchema_1.createCategorySchema.parse({
                    ...req.body,
                    userId: req.user.id
                });
                const category = await this.categoryService.createCategory(data);
                res.status(201).json(category);
            }
            catch (error) {
                next(error);
            }
        };
        this.getCategory = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.params.id);
                const category = await this.categoryService.getCategoryById(id);
                // ← null antes de acessar .userId
                if (!category || category.userId !== req.user.id) {
                    throw new HttpError_1.HttpError("Forbidden", 403);
                }
                res.json(category);
            }
            catch (error) {
                next(error);
            }
        };
        this.getCategoriesByUser = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const userId = req.user.id;
                const categories = await this.categoryService.getCategoriesByUserId(userId);
                res.json(categories);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllCategories = async (req, res, next) => {
            try {
                const categories = await this.categoryService.getAllCategories();
                res.json(categories);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCategory = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.params.id);
                const categoryExist = await this.categoryService.getCategoryById(id);
                // ← ownership check
                if (!categoryExist || categoryExist.userId !== req.user.id) {
                    throw new HttpError_1.HttpError("Forbidden", 403);
                }
                const data = CategorySchema_1.updateCategorySchema.parse(req.body);
                const category = await this.categoryService.updateCategory(id, data);
                res.json(category);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteCategory = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.params.id);
                const categoryExist = await this.categoryService.getCategoryById(id);
                // ← ownership check
                if (!categoryExist || categoryExist.userId !== req.user.id) {
                    throw new HttpError_1.HttpError("Forbidden", 403);
                }
                const category = await this.categoryService.deleteCategory(id);
                res.json({ message: "Categoria deletada com sucesso", category });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CategoryController = CategoryController;
