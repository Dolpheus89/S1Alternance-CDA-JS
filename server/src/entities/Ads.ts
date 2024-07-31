import { Categories } from "./Categories"
import { Tags } from "./Tags"
import { Field, ID, Int, ObjectType } from "type-graphql"
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    RelationId,
} from "typeorm"

@ObjectType()
@Entity("ad")
export class Ads {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id?: number

    @Column()
    @Field()
    title: string

    @Column({ type: "text", nullable: true })
    @Field({ nullable: true })
    description?: string

    @Column()
    @Field()
    owner: string

    @Column({ type: "int", default: 0 })
    @Field((type) => Int)
    price?: number

    @Column({ nullable: true })
    @Field({ nullable: true })
    picture?: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    location?: string

    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
    @Field((type) => String)
    createdAt?: Date

    @ManyToOne(() => Categories, (category) => category.ads, { eager: true })
    @Field((type) => Categories)
    category?: Categories

    @ManyToMany(() => Tags, { cascade: true })
    @JoinTable({
        name: "ad_tags",
        joinColumn: { name: "ad_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" },
    })
    @Field((type) => [Tags])
    tags?: Tags[]

    @RelationId("tags")
    tagsIds?: number[]

    constructor(
        title: string = "",
        description: string | undefined = undefined,
        owner: string = "",
        price?: number,
        picture?: string,
        location?: string,
        createdAt?: Date
    ) {
        this.title = title
        this.description = description
        this.owner = owner
        this.price = price
        this.picture = picture
        this.location = location
        this.createdAt = createdAt
    }
}
