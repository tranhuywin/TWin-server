import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specifications } from './entities/specification.entity';
import { Color } from 'src/color/entities/color.entity';
import { Memory } from 'src/memory/entities/memory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Specifications, Color, Memory])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule { }
