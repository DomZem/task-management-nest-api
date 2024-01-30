import { Injectable } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

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

  async delete(where: Prisma.StatusWhereUniqueInput): Promise<Status> {
    return this.databaseService.status.delete({
      where,
    });
  }
}
