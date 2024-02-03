import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSubtaskDto } from '../../subtask/dto/create-subtask.dto';
import { UpdateTaskDto } from './update-task.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateTaskDto extends OmitType(UpdateTaskDto, [
  'id',
  'subtasks',
] as const) {
  @ValidateNested({ each: true })
  @Type(() => CreateSubtaskDto)
  subtasks?: CreateSubtaskDto[];
}
