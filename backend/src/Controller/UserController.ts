import { Handler } from "express";
import { UserService } from "../Service/UserService";
import { createUserSchema, updateUserSchema } from "../Schema/UserSchema";

export class UserController {
  constructor(private userService: UserService) {}

  createUser: Handler = async (req, res, next) => {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await this.userService.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  getUser: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers: Handler = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  updateUser: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const data = updateUserSchema.parse(req.body);
      const user = await this.userService.updateUser(id, data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  deleteUser: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.deleteUser(id);
      res.json({ message: "Usuário deletado com sucesso", user });
    } catch (error) {
      next(error);
    }
  };
}
