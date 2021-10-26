import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { Phone } from './entities/phone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specifications } from './entities/specification.entity';
import { Color } from 'src/color/entities/color.entity';
import { Memory } from 'src/memory/entities/memory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Specifications, Color, Memory])],
  providers: [PhonesService],
  controllers: [PhonesController],
  exports: [PhonesService]
})
export class PhoneModule { }
