import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Ads } from "./Ads"
@Entity("tags")
export class Tags {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string

    @ManyToMany(() => Ads, (ad) => ad.tags)
    ads?: Ads[]

    constructor(name: string = "") {
        this.name = name
    }
}
