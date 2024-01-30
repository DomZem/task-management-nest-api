import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findMany(@Query('boardId', ParseIntPipe) boardId: number) {
    return this.statusService.findMany({
      where: {
        boardId,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
