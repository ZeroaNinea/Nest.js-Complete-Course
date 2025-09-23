import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsDate,
  IsMilitaryTime,
  IsOptional,
  IsNumber,
} from 'class-validator';

import { Artist } from '../../common/entities/artist.entity';

export class UpdateSongDto {
  @Type(() => Number)
  id: number;

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly artists: [Artist];

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
