import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [TaskService, DatabaseService],
})
export class TaskModule {}
