import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specifications {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    screen_info: string;

    @Column()
    CPU: string;

    @Column()
    rear_camera: string;

    @Column()
    battery: string;

    @Column()
    OS: string;
}