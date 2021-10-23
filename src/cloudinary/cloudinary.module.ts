import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import CloudinaryProvider from './cloudinary.provider';
import CloudinaryService from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}