import { Resolver, Query, ArgsType, Field, Args } from "type-graphql";
import { AuthController } from "../controller/AuthController";
import { User } from "../entity/User";
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
    private authController = new AuthController

    @Query(() => User)
    async login(@Args() { username, password }: loginInput) {
        const result = await this.authController.login(username, password)
        if (errorName.NOTFOUND === result || errorName.WRONGPASS === result) {
            throw new Error(result)
        }
        else return result
    }
}