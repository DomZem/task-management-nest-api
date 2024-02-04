import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Board, Prisma } from '@prisma/client';

@Injectable()
export class BoardService {
  constructor(private databaseService: DatabaseService) {}

  async findUnique(
    boardWhereUniqueInput: Prisma.BoardWhereUniqueInput,
    boardSelect?: Prisma.BoardSelect,
  ): Promise<Board | null> {
    return this.databaseService.board.findUnique({
      where: boardWhereUniqueInput,
      select: boardSelect,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BoardWhereUniqueInput;
    where?: Prisma.BoardWhereInput;
    select?: Prisma.BoardSelect;
    orderBy?: Prisma.BoardOrderByWithRelationInput;
  }): Promise<Board[]> {
    const { skip, take, cursor, where, select, orderBy } = params;
    return this.databaseService.board.findMany({
      skip,
      take,
      cursor,
      where,
      select,
      orderBy,
    });
  }

  async create(
    data: Prisma.BoardCreateInput,
    select?: Prisma.BoardSelect,
  ): Promise<Board> {
    return this.databaseService.board.create({ data, select });
  }

  async update(params: {
    where: Prisma.BoardWhereUniqueInput;
    data: Prisma.BoardUpdateInput;
    select?: Prisma.BoardSelect;
  }): Promise<Board> {
    const { where, data, select } = params;
    return this.databaseService.board.update({
      data,
      where,
      select,
    });
  }

  async delete(where: Prisma.BoardWhereUniqueInput): Promise<Board> {
    return this.databaseService.board.delete({
      where,
    });
  }
}
