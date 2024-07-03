import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Ads } from "./Ads"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity("tags")
export class Tags {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id?: number

    @Column()
    @Field()
    name: string

    @ManyToMany(() => Ads, (ad) => ad.tags)
    @Field((type) => [Ads])
    ads?: Ads[]

    constructor(name: string = "") {
        this.name = name
    }
}
