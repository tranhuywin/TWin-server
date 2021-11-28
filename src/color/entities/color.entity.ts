import { Memory } from 'src/memory/entities/memory.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

    @Column()
    quantity: number;

    @ManyToOne(() => Memory, memory => memory.colors)
    memory: Memory;

    @ManyToOne(() => Product, product => product.colorAccessory)
    product: Product;
}