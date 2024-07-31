import { Field, ID, InputType, Int } from "type-graphql"
import { Tags } from "../Tags"

@InputType()
export class CategoryInput {
    @Field((_) => Int, { nullable: true })
    id?: number

    @Field({ nullable: true })
    name?: string
}

@InputType()
export class AdsInput {
    @Field()
    title!: string

    @Field({ nullable: true })
    description?: string

    @Field()
    owner!: string

    @Field((type) => Int, { nullable: true })
    price?: number

    @Field({ nullable: true })
    picture?: string

    @Field({ nullable: true })
    location?: string

    @Field((type) => CategoryInput)
    category!: CategoryInput

    @Field((type) => [String], { nullable: true })
    tags!: string[]
}
