import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum GenderType {
    MALE = "male",
    FEMAILE = "female"
}

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: GenderType,
        default: GenderType.MALE
    })
    gender: string

    @Column()
    address: string
}
