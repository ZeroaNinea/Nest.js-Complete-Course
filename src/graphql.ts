
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateSongInput {
    id: number;
    title: string;
    artists?: Nullable<Nullable<number>[]>;
    releasedDate?: Nullable<string>;
    duration?: Nullable<string>;
    lyrics?: Nullable<string>;
}

export class UpdateSongInput {
    id: number;
    title?: Nullable<string>;
    artists?: Nullable<Nullable<number>[]>;
    releasedDate?: Nullable<string>;
    duration?: Nullable<string>;
    lyrics?: Nullable<string>;
}

export class Song {
    id: string;
    title?: Nullable<string>;
}

export abstract class IQuery {
    abstract songs(): Song[] | Promise<Song[]>;

    abstract song(id?: Nullable<string>): Song | Promise<Song>;
}

export abstract class IMutation {
    abstract createSong(createSongInput: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(id: string, updateSongInput: UpdateSongInput): UpdateResult | Promise<UpdateResult>;

    abstract deleteSong(id: string): Nullable<DeleteResult> | Promise<Nullable<DeleteResult>>;
}

export class UpdateResult {
    affected: number;
}

export class DeleteResult {
    affected: number;
}

type Nullable<T> = T | null;
