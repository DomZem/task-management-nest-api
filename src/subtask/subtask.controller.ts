import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { SubtaskService } from './subtask.service';

@Controller('subtasks')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Get()
  async findMany(@Query('taskId', ParseIntPipe) taskId: number) {
    return this.subtaskService.findMany({
      where: {
        taskId,
      },
      select: {
        id: true,
        title: true,
        isComplete: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  @Patch(':id')
  async updateIsCompleted(
    @Param('id', ParseIntPipe) id: number,
    @Body() { isComplete }: { isComplete: boolean },
  ) {
    const subtaskToUpdate = this.subtaskService.findUnique({
      id,
    });

    if (!subtaskToUpdate) {
      throw new NotFoundException('Subtask not found');
    }

    return this.subtaskService.update({
      data: {
        isComplete,
      },
      where: {
        id,
      },
    });
  }
}
