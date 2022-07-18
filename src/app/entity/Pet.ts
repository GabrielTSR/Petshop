import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Breed } from './Breed';
import { Client } from './Client';

//File that defines the Category entity
@Entity('tbl_pet')
export class Pet {
    @PrimaryGeneratedColumn({ name: 'id_pet' })
    id: number;

    @Column({
        name: 'pet_name',
        length: 50,
    })
    name: string;

    @Column({
        name: 'pet_age_in_years',
        type: 'int',
    })
    age: number;

    @Column({
        name: 'pet_weight_in_kilograms',
    })
    weight: number;

    @Column({
        name: 'pet_appearance',
        length: 100,
    })
    appearance: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //The pet may belong to more than one client
    @ManyToMany(() => Client)
    @JoinTable()
    owners: Client[];

    @Column()
    id_breed: number;

    @ManyToOne(() => Breed)
    @JoinColumn({ name: 'id_breed' })
    breed: Breed;
}
