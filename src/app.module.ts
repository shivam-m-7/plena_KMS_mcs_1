/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AccessKeyController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessKeyService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot(),],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      })
    })
  ],
  controllers: [AccessKeyController],
  providers: [AccessKeyService],
})
export class AppModule {}
