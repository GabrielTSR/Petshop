import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Breed } from './Breed';

//File that defines the Specie entity
@Entity('tbl_specie')
export class Specie {
    @PrimaryGeneratedColumn({ name: 'id_specie' })
    id: number;

    @Column({
        name: 'specie_name',
        length: 50,
        unique: true,
    })
    name: string;

    @OneToMany(() => Breed, (breed) => breed.specie)
    breeds: Breed[];
}
