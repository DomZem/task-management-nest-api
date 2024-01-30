import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [SubtaskService, DatabaseService],
})
export class SubtaskModule {}
