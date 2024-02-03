import { OmitType } from '@nestjs/mapped-types';
import { UpdateSubtaskDto } from './update-subtask.dto';

export class CreateSubtaskDto extends OmitType(UpdateSubtaskDto, [
  'id',
] as const) {}
