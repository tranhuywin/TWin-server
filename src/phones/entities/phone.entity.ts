import { Memory } from 'src/memory/entities/memory.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Specifications } from './specification.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToOne(() => Specifications)
  @JoinColumn()
  specifications: Specifications;

  @OneToMany(() =>Memory, memory => memory.phone)
  memories: Memory[];
}