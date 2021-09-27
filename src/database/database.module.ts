import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({ uri: configService.get('MONGODB_URL_CLOND') ||  configService.get('MONGODB_URL_LOCAL') }),
      inject: [ConfigService],
      imports: [ConfigModule.forRoot()],
    }),
  ],
})
export default class DatabaseModule {}
