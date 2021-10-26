import { forwardRef, Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from 'src/phones/entities/phone.entity';
import { PhoneModule } from 'src/phones/phones.module';
import { ColorModule } from 'src/color/color.module';
import { Memory } from './entities/memory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memory, Phone]), PhoneModule, forwardRef(()=> ColorModule)],
  controllers: [MemoryController],
  providers: [MemoryService],
  exports: [MemoryService]
})
export class MemoryModule {}
