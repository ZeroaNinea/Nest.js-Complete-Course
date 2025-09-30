import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Song } from './song.model';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'songs',
  })
  songs: Song[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
