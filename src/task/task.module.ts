import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { DatabaseService } from '../database/database.service';
import { TaskController } from './task.controller';
import { StatusService } from '../status/status.service';
import { SubtaskService } from '../subtask/subtask.service';

@Module({
  providers: [TaskService, DatabaseService, SubtaskService, StatusService],
  controllers: [TaskController],
})
export class TaskModule {}
