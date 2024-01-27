import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { DatabaseService } from '../database/database.service';
import { TaskController } from './task.controller';

@Module({
  providers: [TaskService, DatabaseService],
  controllers: [TaskController],
})
export class TaskModule {}
