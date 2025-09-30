import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'Duration must be in mm:ss format.',
  })
  duration: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => IsMilitaryTime)
  lyrics: string;
}
