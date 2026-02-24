import { Handler } from "express";
import { prisma } from "../database";

export class UserClass{
    constructor(){
        
    }

    getUser: Handler = async (req, res, next) => {
        const id  = Number(req.params.id)
        const user = prisma.user.findUnique({where: { id }})
        res.json(user)
    }   
}   