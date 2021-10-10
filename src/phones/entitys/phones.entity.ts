import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Color } from './color.entity';
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
  RAM: number;

  @Column()
  ROM: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToOne(() => Specifications)
  @JoinColumn()
  specifications: Specifications;

  @OneToMany(() =>Color, color => color.phone)
  color: Color[];
}