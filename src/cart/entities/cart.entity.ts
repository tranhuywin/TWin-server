import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartItem } from "./cartItem.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItems: CartItem[];

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    otherRequests: string;
}
