import { Handler } from "express"
import { HttpError } from "../Error/HttpError"
import jwt from "jsonwebtoken"
import "dotenv/config"

const SECRET_KEY = process.env.SECRET_KEY

if (!SECRET_KEY) {
    throw new HttpError("Erro interno", 500);
}

export class AuthMiddleware {

    auth: Handler = (req, res, next) => {
        const header = req.headers.authorization

        if (!header) {
            throw new HttpError("Invalid token", 401)
        }

        const token = header.split(" ")[1]

        try {
            const response = jwt.verify(token, SECRET_KEY)
            if (!response) {
                throw new HttpError("Erro interno", 500);
            }

            req.user = response
            next()

        } catch (error) {
            res.status(401).json({ message: error })
        }
    }

    admin: Handler = (req, res, next) => {
        if (!req.user) {
            throw new HttpError("Invalid token", 401)
        }

        if ((req.user as any).role === "admin") {
            next()
        } else {
            throw new HttpError('Admin privileges required', 403)
        }
    }
}