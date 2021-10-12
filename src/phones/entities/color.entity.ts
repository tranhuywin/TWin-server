import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Phone } from './phone.entity';

@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    color: string;

    @Column()
    extra_price: number;

    @ManyToOne(() => Phone, phone => phone.color)
    phone: Phone;
}