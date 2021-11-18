import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateCartItemDto } from './dto/update-cartItem.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productService: ProductService,
  ) { }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = this.cartRepository.create(createCartDto);
    return await this.cartRepository.save(cart);
  }

  async addProduct(cartId: number, createCartItemDto: CreateCartItemDto): Promise<Cart> {
    const cart = await this.findOne(cartId);
    const product = await this.productService.findOne(createCartItemDto.productId);

    if (product.quantity < createCartItemDto.quantity) {
      throw new BadRequestException('Product quantity is not enough');
    }

    if (cart.cartItems.find(cartItem => cartItem.product.id === product.id)) {
      throw new BadRequestException('Product already in cart');
    }

    const cartItem = this.cartItemRepository.create(createCartItemDto);
    cartItem.product = product;
    cartItem.cart = cart;
    await this.cartItemRepository.save(cartItem);
    return await this.findOne(cartId);
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.product', 'product')
      .where('cart.id = :id', { id })
      .getOne();

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    await this.findOne(id);
    await this.cartRepository.update(id, updateCartDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IStatusResult> {
    const cart = await this.findOne(id);
    await this.cartRepository.remove(cart);
    const result: IStatusResult = { status: 'success' };
    return result;
  }

  async removeCartItem(cartItemId: number): Promise<IStatusResult> {
    const cartItem = await this.cartItemRepository.findOne(cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    await this.cartItemRepository.remove(cartItem);
    const result: IStatusResult = { status: 'success' };
    return result;
  }

  async updateCartItem(id: number, updateCartItemDto: UpdateCartItemDto): Promise<IStatusResult> {
    const dataUpdate = await this.cartItemRepository.update(id, updateCartItemDto);
    if (dataUpdate.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
    const result: IStatusResult = { status: 'success' };

    return result;
  }

}
