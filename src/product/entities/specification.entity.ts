import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Specifications {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    value: string;

    @ManyToOne(() => Product, product => product.specifications, { cascade: true, onDelete: "CASCADE"})
    product: Product;
}