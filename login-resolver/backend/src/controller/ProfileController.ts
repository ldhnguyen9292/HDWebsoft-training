import { Request, Response, NextFunction } from 'express';
import { getRepository } from "typeorm";
import { Profile } from "../entity/Profile";

export class ProfileController {
    private profileRepository = getRepository(Profile)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.profileRepository.find()
    }

    async add(request: Request, response: Response, next: NextFunction) {
        return this.profileRepository.create(request.body)
    }
}