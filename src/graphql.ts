
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateSongInput {
    title: string;
    artists?: Nullable<number[]>;
    releasedDate: string;
    duration: string;
    lyrics: string;
}

export class UpdateSongInput {
    title?: Nullable<string>;
    artists?: Nullable<number[]>;
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

    abstract error(error?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;
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
