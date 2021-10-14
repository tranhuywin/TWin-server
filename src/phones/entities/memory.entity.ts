import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Color } from './color.entity';
import { Phone } from './phone.entity';

@Entity()
export class Memory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Ram: number;

    @Column()
    Rom: number;

    @OneToMany(() =>Color, color => color.memory)
    color: Color[];

    @ManyToOne(() => Phone, phone => phone.memory)
    phone: Phone;
}