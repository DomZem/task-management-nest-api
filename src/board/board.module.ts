import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { DatabaseService } from '../database/database.service';
import { BoardController } from './board.controller';
import { StatusService } from '../status/status.service';

@Module({
  providers: [BoardService, DatabaseService, StatusService],
  controllers: [BoardController],
})
export class BoardModule {}
