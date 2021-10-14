import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { genSaltSync, hashSync } from 'bcryptjs'

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find({ relations: ["profile"] });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id, { relations: ['profile'] });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { username, password, profile } = request.body;
            const salt = genSaltSync(10);
            const hash = hashSync(password, salt)
            const newUser = await this.userRepository.save({ username, password: hash, profile });
            return newUser
        } catch (error) {
            return error
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
        return { message: "Delete successfully" }
    }

}