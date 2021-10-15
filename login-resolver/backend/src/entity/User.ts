import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Profile } from "./Profile";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Field(() => String)
    @Column({
        type: "varchar",
        length: 50,
        unique: true
    })
    username: string;

    @Field(() => String)
    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Field(() => Profile, { nullable: true })
    @OneToOne(() => Profile, { cascade: true })
    @JoinColumn()
    profile?: Profile

    @Field(() => String)
    token?: string
}
