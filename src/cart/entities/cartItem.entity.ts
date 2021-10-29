import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.cartItems)
    product: Product;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart: Cart;
    
    @Column()
    quantity: number;
}