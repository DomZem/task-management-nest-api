import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

export class UpdateSubtaskDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsBoolean()
  isComplete: boolean;
}
