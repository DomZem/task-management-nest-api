import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BoardModule,
    TaskModule,
    StatusModule,
  ],
})
export class AppModule {}
