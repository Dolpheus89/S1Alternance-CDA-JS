import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { Categories } from "./Categories";

@Entity('ad')
export class Ads {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({length: 100})
    title: string

    @Column({nullable:true})
    description?: string

    @Column({length: 100})
	owner: string

    @Column({ nullable: true })
	price?: number | 0

    @Column({ nullable: true })
    picture?:string

    @Column({ nullable: true })
    location?: string

    @Column({ nullable: true })
	createdAt?: Date

    @Column({ type: 'int', default: 3 })
    category_Id?: number;

    @ManyToOne(() => Categories, category => category.ads, {eager:true})
    @JoinColumn({ name: "category_id" })
    category?: Categories;

    constructor(
        title: string = '',
        description: string | undefined = undefined,
        owner: string = '',
        price?: number,
        picture?: string,
        location?: string,
        createdAt?: Date,
        categoryId?: number,
    ) {
        this.title = title;
        this.description = description;
        this.owner = owner;
        this.price = price;
        this.picture = picture;
        this.location = location;
        this.createdAt = createdAt;
        this.category_Id = categoryId;
    }
}

