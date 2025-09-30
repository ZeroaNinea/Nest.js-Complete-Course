import { IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => Date)
  duration: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => IsMilitaryTime)
  lyrics: string;
}
