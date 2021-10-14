import { Resolver, Query, ArgsType, Field, Args } from "type-graphql";
import { User } from "../entity/User";
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { errorName } from "../errorConstants";

@ArgsType()
class loginInput {
    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}

@Resolver()
export class AuthResolver {

    private userRepo = getRepository(User)

    @Query(() => User)
    async login(@Args() { username, password }: loginInput) {
        try {
            const user = await this.userRepo.findOne({ username }, { relations: ["profile"] })
            const comparePass = await compareSync(password, user.password)
            if (comparePass) {
                const serectKey = "TramCa"
                const token = sign({ username, profile: user.profile }, serectKey, { expiresIn: 60 * 5 })
                return { token }
            }
            throw new Error(errorName.WRONGPASS)
        } catch (error) {
            const mess = error.message === errorName.WRONGPASS ? errorName.WRONGPASS : errorName.NOTFOUND
            throw new Error(mess)
        }
    }
}