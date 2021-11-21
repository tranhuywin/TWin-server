import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ColorModule } from './color/color.module';
import { MemoryModule } from './memory/memory.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProductModule, UserModule, CloudinaryModule, ColorModule, MemoryModule, CartModule, OrderModule],
  controllers: [UserController],
}) 
export class AppModule {}
