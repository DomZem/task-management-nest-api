import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBoardDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateStatusDto)
  statuses?: UpdateStatusDto[];
}

class UpdateStatusDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  color: string;
}
