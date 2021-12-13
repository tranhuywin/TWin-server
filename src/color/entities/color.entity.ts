import { Memory } from 'src/memory/entities/memory.entity';
import { OrderItem } from 'src/order/entities/orderItem.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

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
    originalPrice: number;

    @Column()
    image: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Memory, memory => memory.colors, { cascade: true, onDelete: "CASCADE"})
    memory: Memory;

    @ManyToOne(() => Product, product => product.colorAccessory, { cascade: true, onDelete: "CASCADE"})
    product: Product;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.color)
    orderItems: OrderItem[];
}