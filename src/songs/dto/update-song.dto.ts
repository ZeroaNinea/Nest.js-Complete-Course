import { Type } from 'class-transformer';
import { IsString, IsArray, IsDate, IsMilitaryTime } from 'class-validator';

export class UpdateSongDto {
  @Type(() => Number)
  id: number;

  @IsString()
  readonly title: string;

  @IsArray()
  readonly artists: [string];

  @IsDate()
  @Type(() => Date)
  readonly releasedDate: Date;

  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  readonly lyrics: string;
}
