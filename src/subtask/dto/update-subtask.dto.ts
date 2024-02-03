import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateSubtaskDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsBoolean()
  isComplete: boolean;
}
