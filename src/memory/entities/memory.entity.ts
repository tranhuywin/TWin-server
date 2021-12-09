import { Color } from 'src/color/entities/color.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

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

    @ManyToOne(() => Product, product => product.memories,{ cascade: true, onDelete: "CASCADE"})
    product: Product;
}