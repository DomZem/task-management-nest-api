import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { TaskService } from '../task/task.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '@prisma/client';
import { GetUser } from '../common/decorator/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('subtasks')
export class SubtaskController {
  constructor(
    private readonly subtaskService: SubtaskService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async findMany(
    @GetUser() user: User,
    @Query('taskId', ParseIntPipe) taskId: number,
  ) {
    const isUserTask = await this.taskService.isUserTask(taskId, user.id);

    if (!isUserTask) {
      throw new NotFoundException('Subtasks not found');
    }

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
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { isComplete }: { isComplete: boolean },
  ) {
    const subtaskToUpdate = await this.subtaskService.findUnique({
      id,
      task: {
        status: {
          board: {
            userId: user.id,
          },
        },
      },
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
