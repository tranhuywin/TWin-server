import { Color } from "src/color/entities/color.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=>Color)
    @JoinColumn()
    color: Color;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;

    @Column()
    quantity: number;
}