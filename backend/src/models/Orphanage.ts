import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import Image from './Images';

@Entity('orphanages')
export default class Orphanage{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    whatsapp: number;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekeds: string;

    @OneToMany(()=> Image, image => image.orphanage,{
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];

}