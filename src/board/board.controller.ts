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
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { DatabaseService } from '../database/database.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  findMany(@Req() req) {
    return this.boardService.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        userId: req.user.id,
      },
    });
  }

  @Post()
  async create(@Req() req, @Body() { name, statuses }: CreateBoardDto) {
    return this.boardService.create({
      name,
      statuses: {
        createMany: {
          data: statuses,
        },
      },
      user: {
        connect: {
          id: req.user.id,
        },
      },
    });
  }

  @Get(':id')
  async findUnique(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const board = await this.boardService.findUnique(
      {
        id,
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
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, statuses }: UpdateBoardDto,
  ) {
    const boardToUpdate = await this.boardService.findUnique({
      id,
    });

    if (!boardToUpdate || boardToUpdate.userId !== req.user.id) {
      throw new NotFoundException('Board not found');
    }

    const existingStatuses = await this.databaseService.status.findMany({
      where: {
        boardId: id,
      },
    });

    const existingStatusesID = existingStatuses.map((e) => e.id);
    const statusesID = statuses.map((s) => s.id);

    const statusesIdToRemove = existingStatusesID.filter(
      (s) => !statusesID.includes(s),
    );

    await Promise.all([
      statusesIdToRemove.map(
        async (statusId) =>
          await this.databaseService.status.delete({
            where: {
              id: statusId,
            },
          }),
      ),
    ]);

    await Promise.all([
      statuses.map(
        async ({ id, name, color }) =>
          await this.databaseService.status.upsert({
            where: {
              id,
            },
            update: {
              name,
              color,
            },
            create: {
              name,
              color,
              boardId: boardToUpdate.id,
            },
          }),
      ),
    ]);

    return this.boardService.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const boardToRemove = await this.boardService.findUnique({
      id,
    });

    if (!boardToRemove || boardToRemove.userId !== req.user.id) {
      throw new NotFoundException('Board not found');
    }

    return this.boardService.delete({
      id,
    });
  }
}
