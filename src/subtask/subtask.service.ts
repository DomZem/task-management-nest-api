import { Injectable } from '@nestjs/common';
import { Prisma, Subtask } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SubtaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUnique(
    subtaskWhereUniqueInput: Prisma.SubtaskWhereUniqueInput,
    subtaskSelect?: Prisma.SubtaskSelect,
  ): Promise<Subtask | null> {
    return this.databaseService.subtask.findUnique({
      where: subtaskWhereUniqueInput,
      select: subtaskSelect,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SubtaskWhereUniqueInput;
    where?: Prisma.SubtaskWhereInput;
    select?: Prisma.SubtaskSelect;
    orderBy?: Prisma.SubtaskOrderByWithRelationInput;
  }): Promise<Subtask[]> {
    const { skip, take, cursor, where, select, orderBy } = params;
    return this.databaseService.subtask.findMany({
      skip,
      take,
      cursor,
      where,
      select,
      orderBy,
    });
  }

  async create(data: Prisma.SubtaskCreateInput): Promise<Subtask> {
    return this.databaseService.subtask.create({ data });
  }

  async update(params: {
    where: Prisma.SubtaskWhereUniqueInput;
    data: Prisma.SubtaskUpdateInput;
    include?: Prisma.SubtaskInclude;
  }): Promise<Subtask> {
    const { where, data, include } = params;
    return this.databaseService.subtask.update({
      data,
      where,
      include,
    });
  }

  async delete(where: Prisma.SubtaskWhereUniqueInput): Promise<Subtask> {
    return this.databaseService.subtask.delete({
      where,
    });
  }
}
