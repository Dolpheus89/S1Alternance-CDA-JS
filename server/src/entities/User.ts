import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id?: number

    @Column()
    @Field()
    email: string

    @Column()
    @Field()
    role: string

    @Column()
    // @Field()
    passwordHashed: string

    constructor(
        email: string = "",
        role: string = "",
        passwordHashed: string = ""
    ) {
        this.email = email
        this.role = role
        this.passwordHashed = passwordHashed
    }
}
