import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [StatusService, DatabaseService],
  exports: [StatusService],
})
export class StatusModule {}
