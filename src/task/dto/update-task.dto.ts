import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateSubtaskDto } from '../../subtask/dto/update-subtask.dto';

export class UpdateTaskDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  statusId: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateSubtaskDto)
  subtasks?: UpdateSubtaskDto[];
}
