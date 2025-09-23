import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsMilitaryTime,
  IsNumber,
} from 'class-validator';

import { Artist } from '../../common/entities/artist.entity';

export class CreateSongDto {
  @Type(() => Number)
  id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  // @IsString()
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: [Artist];

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @IsString()
  @IsNotEmpty()
  readonly lyrics: string;
}
