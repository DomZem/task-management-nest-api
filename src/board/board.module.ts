import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { DatabaseService } from '../database/database.service';
import { BoardController } from './board.controller';

@Module({
  providers: [BoardService, DatabaseService],
  controllers: [BoardController],
})
export class BoardModule {}
