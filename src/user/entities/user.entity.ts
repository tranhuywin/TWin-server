import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({ name: 'register_date' })
  registerDate: string;

  @Column()
  password: string;

  @Column({ name: 'role', default: 'user' })
  typeRole: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}

