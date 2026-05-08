import { Handler } from "express";
import { UserService } from "../Service/UserService";
import { createUserSchema, loginUserSchema, updateUserSchema, userQuerySchema } from "../Schema/UserSchema";
import { HttpError } from "../Error/HttpError";

export class UserController {
  constructor(private userService: UserService) { }

  register: Handler = async (req, res, next) => {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await this.userService.createUser(data);

      res.cookie("token", user, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
      })

      return res.status(201).json({ message: "Register sucessfuly" })

    } catch (error) {
      next(error);
    }
  };

  login: Handler = async (req, res, next) => {
    try {

      const data = loginUserSchema.parse(req.body)
      const user = await this.userService.login(data)

      res.cookie("token", user, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
      })


      return res.status(200).json({ message: "Login sucessfuly" })

    } catch (error) {
      next(error)
    }
  }

  logout: Handler = async (req, res, next) => {

    try {

      if (!req.user) throw new HttpError("Invalid token", 401)

      res.clearCookie("token")
      res.json({ message: "Logout realizado com sucesso" })

    } catch (error) {
      throw new HttpError("Internal error", 500)
    }

  }

  getUserById: Handler = async (req, res, next) => {
    try {

      if (!req.user) throw new HttpError("Invalid token", 401)

      const id = Number((req.user as any).id);
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers: Handler = async (req, res, next) => {
    try {
      const query = userQuerySchema.parse(req.query)
      const users = await this.userService.getAllUsers(query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  updateUser: Handler = async (req, res, next) => {
    try {
      if (!req.user) throw new HttpError("Invalid token", 401)

      const id = Number((req.user as any).id);
      const data = updateUserSchema.parse(req.body);
      const user = await this.userService.updateUser(id, data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  deleteUser: Handler = async (req, res, next) => {
    try {
      if (!req.user) throw new HttpError("Invalid token", 401)

      const id = Number((req.user as any).id);
      const user = await this.userService.deleteUser(id);
      res.json({ message: "Usuário deletado com sucesso", user });
    } catch (error) {
      next(error);
    }
  };
}
