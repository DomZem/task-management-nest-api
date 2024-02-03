import { Injectable } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUnique(
    statusWhereUniqueInput: Prisma.StatusWhereUniqueInput,
    statusSelect?: Prisma.StatusSelect,
  ): Promise<Status | null> {
    return this.databaseService.status.findUnique({
      where: statusWhereUniqueInput,
      select: statusSelect,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StatusWhereUniqueInput;
    where?: Prisma.StatusWhereInput;
    select?: Prisma.StatusSelect;
    orderBy?: Prisma.StatusOrderByWithRelationInput;
  }): Promise<Status[]> {
    const { skip, take, cursor, where, select, orderBy } = params;
    return this.databaseService.status.findMany({
      skip,
      take,
      cursor,
      where,
      select,
      orderBy,
    });
  }

  async create(data: Prisma.StatusCreateInput): Promise<Status> {
    return this.databaseService.status.create({ data });
  }

  async update(params: {
    where: Prisma.StatusWhereUniqueInput;
    data: Prisma.StatusUpdateInput;
    include?: Prisma.StatusInclude;
  }): Promise<Status> {
    const { where, data, include } = params;
    return this.databaseService.status.update({
      data,
      where,
      include,
    });
  }

  async updateMany(
    boardId: number,
    statuses: UpdateStatusDto[],
  ): Promise<Status[]> {
    const existingStatuses = await this.findMany({
      where: {
        boardId,
      },
    });

    const statusesID = statuses.map(({ id }) => id);
    const existingStatusesID = new Set(existingStatuses.map(({ id }) => id));

    const statusesIDToRemove = [...existingStatusesID].filter(
      (existingStatusID) => !statusesID.includes(existingStatusID),
    );

    // remove statuses
    await this.databaseService.status.deleteMany({
      where: {
        id: {
          in: statusesIDToRemove,
        },
      },
    });

    const statusesToCreate: Prisma.StatusCreateManyInput[] = [];

    for (const { id, name, color } of statuses) {
      if (existingStatusesID.has(id)) {
        await this.update({
          where: {
            id: id,
          },
          data: {
            name,
            color,
          },
        });
      } else {
        statusesToCreate.push({ name, color, boardId });
      }
    }

    await this.databaseService.status.createMany({
      data: statusesToCreate,
    });

    return this.findMany({
      where: {
        boardId,
      },
    });
  }

  async delete(where: Prisma.StatusWhereUniqueInput): Promise<Status> {
    return this.databaseService.status.delete({
      where,
    });
  }

  async isUserStatus(statusId: number, userId: number): Promise<boolean> {
    return !!this.databaseService.status.findUnique({
      where: {
        id: statusId,
        board: {
          userId,
        },
      },
    });
  }
}
