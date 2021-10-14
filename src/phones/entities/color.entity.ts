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

    @ManyToOne(() => Memory, memory => memory.color)
    memory: Memory;
}