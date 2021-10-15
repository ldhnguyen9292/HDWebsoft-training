import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { genSaltSync, hashSync } from 'bcryptjs'
import { UserInput, ProfileInput } from './../resolvers/userResolver'
import { errorName } from "../errorConstants";

export class UserController {
    private userRepository = getRepository(User);

    async all() {
        const userList = await this.userRepository.find({ relations: ["profile"] });
        if (!userList) return errorName.NOTFOUND
        return userList
    }

    async one(id: number) {
        const user = await this.userRepository.findOne(id, { relations: ['profile'] });
        if (!user) return errorName.NOTFOUND
        return user
    }

    async save(data: UserInput) {
        try {
            const { username, password, profile } = data;
            const salt = genSaltSync(10);
            const hash = hashSync(password, salt)
            const newUser = await this.userRepository.save({ username, password: hash, profile });
            return newUser
        } catch (error) {
            return errorName.DUPLICATEUSERNAME
        }
    }

    async remove(id: number) {
        let userToRemove = await this.userRepository.findOne(id);
        await this.userRepository.remove(userToRemove);
        return "Delete successfully"
    }

    async update(id: number, profile: ProfileInput) {
        const result = await this.userRepository.save({ id, profile }).catch(() => errorName.NOTFOUND)
        if (result === errorName.NOTFOUND) return errorName.NOTFOUND
        let userToUpdate = await this.userRepository.findOne(id, { relations: ['profile'] })
        return userToUpdate
    }

}