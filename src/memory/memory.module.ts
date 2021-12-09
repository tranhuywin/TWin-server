import { forwardRef, Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ColorModule } from 'src/color/color.module';
import { Memory } from './entities/memory.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Memory, Product]), forwardRef(()=> ColorModule), forwardRef(()=> ProductModule)],
  controllers: [MemoryController],
  providers: [MemoryService],
  exports: [MemoryService]
})
export class MemoryModule {}
