import { IsDateString, IsString, Matches, IsOptional } from 'class-validator';

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  releaseDate: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'Duration must be in mm:ss format.',
  })
  duration: number;

  @IsOptional()
  @IsString()
  lyrics?: string;
}
