import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { DatabaseService } from '../database/database.service';
import { SubtaskController } from './subtask.controller';
import { TaskService } from '../task/task.service';

@Module({
  providers: [SubtaskService, DatabaseService, TaskService],
  controllers: [SubtaskController],
})
export class SubtaskModule {}
