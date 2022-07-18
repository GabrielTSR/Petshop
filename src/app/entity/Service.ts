import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pet } from './Pet';

//File that defines the Service entity
@Entity('tbl_service')
export class Service {
    @PrimaryGeneratedColumn({ name: 'id_service' })
    id: number;

    @Column({
        name: 'service_name',
        length: 100,
    })
    name: string;

    @Column({
        type: 'text',
    })
    description: string;

    @Column({
        name: 'duration_in_minutes',
        type: 'int',
    })
    duration: number;

    @Column({
        name: 'price_real',
    })
    priceReal: number;
}
