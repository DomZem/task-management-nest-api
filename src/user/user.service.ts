import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.databaseService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await this.hashPassword(data.password);

    return this.databaseService.user.create({ data });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.databaseService.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.databaseService.user.delete({
      where,
    });
  }

  private hashPassword(password: string): Promise<string> {
    return argon.hash(password);
  }
}
