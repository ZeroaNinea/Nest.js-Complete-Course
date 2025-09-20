import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsMilitaryTime,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  // @IsString()
  @IsNotEmpty()
  @IsArray()
  readonly artist: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;
}
