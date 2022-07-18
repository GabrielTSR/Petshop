import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Pet } from './Pet';
import { Specie } from './Specie';

//File that defines the Breed entity
@Entity('tbl_breed')
export class Breed {
    @PrimaryGeneratedColumn({ name: 'id_breed' })
    id: number;

    @Column({
        name: 'breed_name',
        length: 50,
        unique: true,
    })
    name: string;

    @Column()
    id_specie: number;

    @ManyToOne(() => Specie)
    @JoinColumn({ name: 'id_specie' })
    specie: Specie;

    @OneToMany(() => Pet, (pet) => pet.breed)
    pets: Pet[];
}
