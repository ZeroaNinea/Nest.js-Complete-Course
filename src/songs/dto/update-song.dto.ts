import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsDate,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';

export class UpdateSongDto {
  @Type(() => Number)
  id: number;

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsArray()
  @IsOptional()
  readonly artists: [string];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
