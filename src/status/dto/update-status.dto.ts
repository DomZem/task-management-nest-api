import { IsNumber, IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  color: string;
}
