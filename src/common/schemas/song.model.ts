import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Album } from './album.model';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  releasedDate: string;

  @Prop({
    required: true,
  })
  duration: string;

  @Prop()
  lyrics: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'albums',
  })
  album: Album;
}

export const SongSchema = SchemaFactory.createForClass(Song);
