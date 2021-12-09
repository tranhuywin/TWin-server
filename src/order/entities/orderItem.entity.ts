import { Color } from "src/color/entities/color.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=>Color, { cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    color: Color;

    @ManyToOne(() => Order, (order) => order.orderItems, { cascade: true, onDelete: "CASCADE"})
    order: Order;

    @Column()
    quantity: number;
}