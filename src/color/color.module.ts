import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Memory } from 'src/phones/entities/memory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Memory])],
  controllers: [ColorController],
  providers: [ColorService]
})
export class ColorModule {}
