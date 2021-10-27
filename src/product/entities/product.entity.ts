import { Memory } from 'src/memory/entities/memory.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Specifications } from './specification.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column()
  description: string;

  //Todo: check this
  @Column()
  image: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToMany(() => Specifications, specifications => specifications.product)
  specifications: [Specifications];

  @OneToMany(() =>Memory, memory => memory.product)
  memories: Memory[];
}