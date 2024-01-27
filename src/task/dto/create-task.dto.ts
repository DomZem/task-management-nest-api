import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  statusId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateSubtaskDto)
  subtasks?: CreateSubtaskDto[];
}

class CreateSubtaskDto {
  @IsString()
  title: string;

  @IsBoolean()
  isComplete: boolean;
}
