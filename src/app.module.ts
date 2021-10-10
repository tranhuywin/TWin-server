import { Module } from '@nestjs/common';
import { PhoneModule } from './phones/phones.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), PhoneModule, UserModule],
  controllers: [UserController],
}) 
export class AppModule {}
