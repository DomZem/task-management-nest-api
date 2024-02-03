import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBoardDto } from './update-board.dto';
import { OmitType } from '@nestjs/mapped-types';
import { CreateStatusDto } from '../../status/dto/create-status.dto';

export class CreateBoardDto extends OmitType(UpdateBoardDto, [
  'id',
  'statuses',
] as const) {
  @ValidateNested({ each: true })
  @Type(() => CreateStatusDto)
  statuses?: CreateStatusDto[];
}
