import { Color } from "src/color/entities/color.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Color, (color) => color.orderItems, { cascade: true, onDelete: "CASCADE" })
    color: Color;

    @ManyToOne(() => Order, (order) => order.orderItems, { cascade: true, onDelete: "CASCADE"})
    order: Order;

    @Column()
    quantity: number;
}