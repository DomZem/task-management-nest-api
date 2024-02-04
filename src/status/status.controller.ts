import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GetUser } from '../common/decorator/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findMany(
    @GetUser() user: User,
    @Query('boardId', ParseIntPipe) boardId: number,
  ) {
    return this.statusService.findMany({
      where: {
        board: {
          id: boardId,
          userId: user.id,
        },
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
