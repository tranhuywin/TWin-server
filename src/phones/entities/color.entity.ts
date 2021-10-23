import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Memory } from './memory.entity';

@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    HexRGB: string;

    @Column()
    price: number;

    @Column()
    marketPrice: number;

    @Column()
    image: string;

    @ManyToOne(() => Memory, memory => memory.colors)
    memory: Memory;
}