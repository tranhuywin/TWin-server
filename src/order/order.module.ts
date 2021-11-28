import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';
import { OrderItem } from './entities/orderItem.entity';
import { ColorModule } from 'src/color/color.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductModule, ColorModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
