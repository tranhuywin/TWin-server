import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./orderItem.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders, { cascade: true, onDelete: "CASCADE"})
    user: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[];

    @Column()
    status: number;

    @Column()
    phoneNumber: string;

    @Column("text")
    city: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    otherRequests: string;

    @Column("date")
    createdAt: Date;

    @Column("date")
    updatedAt: Date;
}
