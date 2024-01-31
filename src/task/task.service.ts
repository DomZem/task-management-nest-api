import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUnique(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
    taskSelect?: Prisma.TaskSelect,
  ): Promise<Task | null> {
    return this.databaseService.task.findUnique({
      where: taskWhereUniqueInput,
      select: taskSelect,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    select?: Prisma.TaskSelect;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, select, orderBy } = params;
    return this.databaseService.task.findMany({
      skip,
      take,
      cursor,
      where,
      select,
      orderBy,
    });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.databaseService.task.create({ data });
  }

  async update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
    select?: Prisma.TaskSelect;
  }): Promise<Task> {
    const { where, data, select } = params;
    return this.databaseService.task.update({
      data,
      where,
      select,
    });
  }

  async delete(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.databaseService.task.delete({
      where,
    });
  }
}
