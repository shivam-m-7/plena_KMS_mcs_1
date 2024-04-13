/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { RateLimiterMiddleware } from './ratelimiter.middleware';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(new RateLimiterMiddleware(configService));
  
  await app.listen(3000);
}
