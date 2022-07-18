import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Client } from './Client';
import { Pet } from './Pet';
import { Service } from './Service';

//File that defines the Scheduling entity
@Entity('tbl_scheduling')
export class Scheduling {
    @PrimaryGeneratedColumn({ name: 'id_scheduling' })
    id: number;

    @Column({
        name: 'date_scheduling',
    })
    wantedDate: Date;

    @Column({
        default: false,
    })
    isPaid: boolean;

    @Column({
        default: false,
    })
    isFinished: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    id_client: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'id_client' })
    clientRequester: Client;

    @Column()
    id_service: number;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'id_service' })
    service: Service;

    @Column()
    id_pet: number;

    @ManyToOne(() => Pet)
    @JoinColumn({ name: 'id_pet' })
    pet: Pet;
}
