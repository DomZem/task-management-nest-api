import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './common/filter/database-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  const port = configService.get<number>('PORT');

  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalFilters(new DatabaseExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
