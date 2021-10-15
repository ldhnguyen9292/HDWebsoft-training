import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum GenderType {
    MALE = "male",
    FEMALE = "female"
}
registerEnumType(GenderType, {
    name: "GenderType"
})

@Entity()
@ObjectType()
export class Profile {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Field(() => String, { nullable: true })
    @Column({
        type: "enum",
        enum: GenderType,
        default: GenderType.MALE
    })
    gender?: string

    @Field(() => String)
    @Column()
    address: string
}
