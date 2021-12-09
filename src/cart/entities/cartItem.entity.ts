import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.cartItems, { cascade: true, onDelete: "CASCADE"})
    product: Product;

    @ManyToOne(() => Cart, cart => cart.cartItems, { cascade: true, onDelete: "CASCADE"})
    cart: Cart;
    
    @Column()
    quantity: number;
}