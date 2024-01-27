import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [BoardService, DatabaseService],
})
export class BoardModule {}
