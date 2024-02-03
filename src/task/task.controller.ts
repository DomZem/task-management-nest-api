import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StatusService } from '../status/status.service';
import { User } from '@prisma/client';
import { GetUser } from '../common/decorator/get-user.decorator';
import { SubtaskService } from '../subtask/subtask.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService,
    private readonly statusService: StatusService,
  ) {}

  @Post()
  async create(
    @GetUser() user: User,
    @Body() { title, description, subtasks, statusId }: CreateTaskDto,
  ) {
    const isUserStatus = await this.statusService.isUserStatus(
      statusId,
      user.id,
    );

    if (!isUserStatus) {
      throw new ForbiddenException('You cannot create task');
    }

    return this.taskService.create({
      title,
      description,
      subtasks: {
        createMany: {
          data: subtasks,
        },
      },
      status: {
        connect: {
          id: statusId,
        },
      },
    });
  }

  @Get()
  async findMany(
    @GetUser() user: User,
    @Query('statusId', ParseIntPipe) statusId: number,
  ) {
    const isUserStatus = await this.statusService.isUserStatus(
      statusId,
      user.id,
    );

    if (!isUserStatus) {
      throw new ForbiddenException('You cannot read tasks');
    }

    return this.taskService.findMany({
      where: {
        statusId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        statusId: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });
  }

  @Put(':id')
  async updateTask(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { title, description, statusId, subtasks }: UpdateTaskDto,
  ) {
    const isUserStatus = await this.statusService.isUserStatus(
      statusId,
      user.id,
    );

    if (!isUserStatus) {
      throw new ForbiddenException('You cannot update task');
    }

    const taskToUpdate = await this.taskService.findUnique({
      id,
    });

    if (!taskToUpdate) {
      throw new NotFoundException('Task not found');
    }

    await this.subtaskService.updateMany(id, subtasks);

    return this.taskService.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status: {
          connect: {
            id: statusId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }

  @Patch(':id')
  async updateTaskStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { statusId }: { statusId: number },
  ) {
    const taskToUpdate = await this.taskService.findUnique({
      id,
    });

    if (!taskToUpdate) {
      throw new NotFoundException('Task not found');
    }

    const isUserStatus = await this.statusService.isUserStatus(
      taskToUpdate.statusId,
      user.id,
    );

    if (!isUserStatus) {
      throw new ForbiddenException('You cannot update task');
    }

    return this.taskService.update({
      data: {
        status: {
          connect: {
            id: statusId,
          },
        },
      },
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  async delete(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    const taskToRemove = await this.taskService.findUnique({ id });

    if (!taskToRemove) {
      throw new NotFoundException('Task not found');
    }

    const isUserStatus = await this.statusService.isUserStatus(
      taskToRemove.statusId,
      user.id,
    );

    if (!isUserStatus) {
      throw new ForbiddenException('You cannot delete task');
    }

    return this.taskService.delete(taskToRemove);
  }
}
