import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Categories } from "./Categories";
import { Tags } from "./Tags";

@Entity('ad')
export class Ads {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column()
    owner: string;

    @Column({ type: "int", default: 0 })
    price?: number;

    @Column({ nullable: true })
    picture?: string;

    @Column({ nullable: true })
    location?: string;

    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;

    @ManyToOne(() => Categories, category => category.ads)
    category: Categories;

    @ManyToMany(() => Tags)
    @JoinTable({
        name: "ad_tags", 
        joinColumn: { name: "ad_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" }
    })
    tags?: Tags[];

    constructor(title: string, owner: string, category: Categories ) {
        this.title = title;
        this.owner = owner;
        this.category = category;

    }
}
