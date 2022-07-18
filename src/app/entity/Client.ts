import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Pet } from './Pet';

//File that defines the Client entity
@Entity('tbl_client')
export class Client {
    @PrimaryGeneratedColumn({ name: 'id_client' })
    id: number;

    @Column({
        name: 'client_name',
        length: 100,
    })
    name: string;

    @Column({
        name: 'client_phone_number',
        length: 20,
    })
    phoneNumber: string;

    @Column({
        name: 'client_email',
        length: 100,
        unique: true,
    })
    email: string;

    @Column({
        name: 'client_age',
        type: 'int',
    })
    age: number;

    @ManyToMany(() => Pet)
    @JoinTable()
    pets: Pet[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
