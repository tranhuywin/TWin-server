import { Color } from 'src/color/entities/color.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
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
    colors: Color[];

    @ManyToOne(() => Phone, phone => phone.memories)
    phone: Phone;
}