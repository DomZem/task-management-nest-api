import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateStatusDto } from '../../status/dto/update-status.dto';

export class UpdateBoardDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateStatusDto)
  statuses?: UpdateStatusDto[];
}
