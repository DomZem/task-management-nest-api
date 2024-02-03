import { UpdateStatusDto } from './update-status.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateStatusDto extends OmitType(UpdateStatusDto, [
  'id',
] as const) {}
