import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Ads } from "./Ads"
import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
@Entity("categories")
export class Categories {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id?: number

    @Column()
    @Field()
    name: string

    @OneToMany(() => Ads, (ad) => ad.category)
    @Field((type) => [Ads])
    ads?: Promise<Ads[]>

    constructor(name: string = "") {
        this.name = name
    }
}
