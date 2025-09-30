import { IsMilitaryTime, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSongDto {
  @IsString()
  title: string;

  @IsString()
  @Type(() => Date)
  releaseDate: string;

  @IsString()
  @Type(() => IsMilitaryTime)
  duration: string;

  @IsString()
  lyrics: string;
}
