import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StatusService } from '../status/status.service';
import { GetUser } from '../common/decorator/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly statusService: StatusService,
  ) {}

  @Get()
  findMany(@GetUser() user: User) {
    return this.boardService.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        userId: user.id,
      },
    });
  }

  @Post()
  async create(
    @GetUser() user: User,
    @Body() { name, statuses }: CreateBoardDto,
  ) {
    return this.boardService.create(
      {
        name,
        statuses: {
          createMany: {
            data: statuses,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      {
        id: true,
        name: true,
      },
    );
  }

  @Get(':id')
  async findUnique(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const board = await this.boardService.findUnique(
      {
        id,
        userId: user.id,
      },
      {
        id: true,
        name: true,
      },
    );

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }

  @Put(':id')
  async update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, statuses }: UpdateBoardDto,
  ) {
    const boardToUpdate = await this.boardService.findUnique({
      id,
      userId: user.id,
    });

    if (!boardToUpdate) {
      throw new NotFoundException('Board not found');
    }

    await this.statusService.updateMany(id, statuses);

    return this.boardService.update({
      where: {
        id,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  @Delete(':id')
  async delete(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    const boardToRemove = await this.boardService.findUnique({
      id,
      userId: user.id,
    });

    if (!boardToRemove) {
      throw new NotFoundException('Board not found');
    }

    return this.boardService.delete({
      id,
    });
  }
}
