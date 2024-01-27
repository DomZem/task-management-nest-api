import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBoardDto {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateStatusDto)
  statuses?: CreateStatusDto[];
}

class CreateStatusDto {
  @IsString()
  name: string;

  @IsString()
  color: string;
}
