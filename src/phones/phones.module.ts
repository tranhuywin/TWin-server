import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { Phone } from './entitys/phones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specifications } from './entitys/specification.entity';
import { Color } from './entitys/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Specifications, Color])],
  providers: [PhonesService],
  controllers: [PhonesController],
})
export class PhoneModule {}
