import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
@ApiTags("cart")
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  async create(@Body() createCartDto: CreateCartDto, @Res({ passthrough: true }) response: Response) {
    const newCart = await this.cartService.create(createCartDto);
    response.cookie('cart_id', newCart.id);
    return newCart;
  }

  @Post('/:id/add-product')
  addProduct(@Param('id') id: number, @Body() createCartItemDto: CreateCartItemDto): Promise<Cart> {
    return this.cartService.addProduct(id, createCartItemDto);
  }

  
  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Cart> {
    console.log(id);
    return this.cartService.findOne(id);
  }

  @Get('/all')
  findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Patch('update-cart-item/:cartItemId')
  updateCartItem(
    @Param('cartItemId') cartItemId: number,
    @Body() updateCartItemDto: CreateCartItemDto
  ): Promise<IStatusResult> {
    return this.cartService.updateCartItem(cartItemId, updateCartItemDto);
  }
  
  @Delete('/remove-cart-item/:cartItemId')
  removeCartItem(@Param('cartItemId') cartItemId: number): Promise<IStatusResult> {
    return this.cartService.removeCartItem(+cartItemId);
  }

}
