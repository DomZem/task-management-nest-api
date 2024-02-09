import { Injectable } from '@nestjs/common';
import { Prisma, Subtask } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

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
    select?: Prisma.SubtaskSelect;
  }): Promise<Subtask> {
    const { where, data, select } = params;
    return this.databaseService.subtask.update({
      data,
      where,
      select,
    });
  }

  async updateMany(
    taskId: number,
    subtasks: UpdateSubtaskDto[],
  ): Promise<Subtask[]> {
    const existingSubtasks = await this.findMany({
      where: {
        taskId,
      },
    });

    const subtasksID = subtasks.map(({ id }) => id);
    const existingSubtasksID = new Set(existingSubtasks.map(({ id }) => id));

    const subtasksIDToRemove = [...existingSubtasksID].filter(
      (existingStatusID) => !subtasksID.includes(existingStatusID),
    );

    // remove statuses
    await this.databaseService.subtask.deleteMany({
      where: {
        id: {
          in: subtasksIDToRemove,
        },
      },
    });

    const subtasksToCreate: Prisma.SubtaskCreateManyInput[] = [];

    for (const { id, title, isComplete } of subtasks) {
      if (existingSubtasksID.has(id)) {
        await this.update({
          where: {
            id: id,
          },
          data: {
            title,
            isComplete,
          },
        });
      } else {
        subtasksToCreate.push({ title, isComplete, taskId });
      }
    }

    await this.databaseService.subtask.createMany({
      data: subtasksToCreate,
    });

    return this.findMany({
      where: {
        taskId,
      },
    });
  }

  async delete(where: Prisma.SubtaskWhereUniqueInput): Promise<Subtask> {
    return this.databaseService.subtask.delete({
      where,
    });
  }
}
