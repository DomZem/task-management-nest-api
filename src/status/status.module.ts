import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { DatabaseService } from '../database/database.service';
import { StatusController } from './status.controller';

@Module({
  providers: [StatusService, DatabaseService],
  controllers: [StatusController],
})
export class StatusModule {}
