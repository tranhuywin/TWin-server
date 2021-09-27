import { Module } from '@nestjs/common';
import { PhoneModule } from './phone/phone.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import DatabaseModule from './database/database.module';

@Module({
  imports: [DatabaseModule, PhoneModule, UserModule],
  controllers: [UserController],
})
export class AppModule {}
