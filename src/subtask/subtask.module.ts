import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { DatabaseService } from '../database/database.service';
import { SubtaskController } from './subtask.controller';

@Module({
  providers: [SubtaskService, DatabaseService],
  controllers: [SubtaskController],
})
export class SubtaskModule {}
