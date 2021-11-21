import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=>Product)
    @JoinColumn()
    product: Product;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;

    @Column()
    quantity: number;
}