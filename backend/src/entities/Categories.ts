import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ads } from "./Ads";

@Entity('categories')
export class Categories {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @OneToMany(() => Ads, ad => ad.category_Id)
    ads?: Promise<Ads[]>

    constructor(
        name: string = '',
    ) {
        this.name = name;
    }
}