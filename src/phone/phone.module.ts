import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';

@Module({
  providers: [PhoneService],
  controllers: [PhoneController]
})
export class PhoneModule {}
