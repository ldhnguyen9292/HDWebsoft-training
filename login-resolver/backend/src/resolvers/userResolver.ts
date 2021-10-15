import { ID, Int } from 'type-graphql';
import { UserController } from './../controller/UserController';
import { Arg, Args, ArgsType, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { GenderType, Profile } from '../entity/Profile';
import { errorName } from '../errorConstants';

// Arg cho query, input cho mutation
// Query : R , mutation : CUD
@InputType()
export class ProfileInput implements Partial<Profile>{
    @Field(() => GenderType, { nullable: true })
    gender?: GenderType

    @Field(() => String)
    address: string
}

@InputType()
export class UserInput implements Partial<User>{
    @Field(() => String)
    username: string

    @Field(() => String)
    password: string

    @Field(() => ProfileInput, { nullable: true })
    profile?: ProfileInput
}



@ArgsType()
export class UpdateInput {
    @Field(() => Int)
    id: number

    @Field(() => ProfileInput)
    profile: ProfileInput
}


@Resolver()
export class UserResolver {
    private userController = new UserController

    @Query(() => [User])
    async getAllUser() {
        const userList = await this.userController.all()
        if (userList === errorName.NOTFOUND) throw new Error(userList)
        else return userList
    }

    @Query(() => User)
    async getOneUser(@Arg("id", { description: 'ID of user' }) id: number) {
        const user = await this.userController.one(id)
        if (user === errorName.NOTFOUND) throw new Error(user)
        else return user
    }

    @Mutation(() => User)
    async addNewUser(@Arg("data") data: UserInput) {
        const result = await this.userController.save(data)
        if (result === errorName.DUPLICATEUSERNAME) {
            throw new Error(result)
        }
        return result
    }

    @Mutation(() => String)
    async removeUser(@Arg("id") id: number) {
        return await this.userController.remove(id)
    }

    @Mutation(() => User)
    async updateUser(@Args() { id, profile }: UpdateInput) {
        const user = await this.userController.update(id, profile)
        if (user === errorName.NOTFOUND) throw new Error(user)
        else return user
    }
}