import { User } from './../entity/User';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { errorName } from "../errorConstants";

export class AuthController {
    private userRepo = getRepository(User)

    async login(username, password) {
        try {
            const user = await this.userRepo.findOne({ username }, { relations: ["profile"] })
            const comparePass = await compareSync(password, user.password)
            if (comparePass) {
                const serectKey = "TramCa"
                const token = sign({ username, profile: user.profile }, serectKey, { expiresIn: 60 * 5 })
                return { token }
            }
            return errorName.WRONGPASS
        } catch (error) {
            return errorName.NOTFOUND
        }
    }
}