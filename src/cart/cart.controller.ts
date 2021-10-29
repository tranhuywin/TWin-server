import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
@ApiTags("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Post('/:id/add-product')
  addProduct(@Param('id') id: number, @Body() createCartItemDto: CreateCartItemDto): Promise<Cart>{
    return this.cartService.addProduct(id, createCartItemDto);
  }

  @Get()
  findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cart> {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Delete('/remove-cart-item/:cartItemId')
  removeCartItem( @Param('cartItemId') cartItemId: number): Promise<{ status: string}>{
    return this.cartService.removeCartItem( +cartItemId);
  }
  
}