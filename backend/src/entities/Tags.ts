import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
export class Tags {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;


    constructor(
        name: string = '',
    ) {
        this.name = name;
    }
}