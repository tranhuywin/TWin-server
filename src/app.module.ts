import { Module } from '@nestjs/common';
import { PhoneModule } from './phones/phones.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PhoneModule, UserModule, CloudinaryModule],
  controllers: [UserController],
}) 
export class AppModule {}
