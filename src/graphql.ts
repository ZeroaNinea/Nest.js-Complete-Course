
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CacheControlScope {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export class SignupInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

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

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    is2faEnabled: boolean;
    is2faVerified: boolean;
    apiKey: string;
}

export abstract class IQuery {
    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract profile(): Profile | Promise<Profile>;

    abstract songs(): Song[] | Promise<Song[]>;

    abstract song(id?: Nullable<string>): Song | Promise<Song>;

    abstract error(error?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;
}

export abstract class IMutation {
    abstract signup(signupInput: SignupInput): SignupResponse | Promise<SignupResponse>;

    abstract createSong(createSongInput: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(id: string, updateSongInput: UpdateSongInput): UpdateResult | Promise<UpdateResult>;

    abstract deleteSong(id: string): Nullable<DeleteResult> | Promise<Nullable<DeleteResult>>;
}

export class Profile {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    isEmailVerified?: Nullable<boolean>;
    is2faEnabled?: Nullable<boolean>;
    is2faVerified?: Nullable<boolean>;
}

export class SignupResponse {
    email: string;
}

export class LoginResponse {
    token: string;
}

export class Song {
    id: string;
    title?: Nullable<string>;
}

export abstract class ISubscription {
    abstract songCreated(): Song | Promise<Song>;
}

export class UpdateResult {
    affected: number;
}

export class DeleteResult {
    affected: number;
}

type Nullable<T> = T | null;
