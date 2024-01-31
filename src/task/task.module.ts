import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { DatabaseService } from '../database/database.service';
import { TaskController } from './task.controller';
import { StatusService } from '../status/status.service';

@Module({
  providers: [TaskService, DatabaseService, StatusService],
  controllers: [TaskController],
})
export class TaskModule {}
