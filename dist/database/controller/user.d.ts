/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare const createUser: (userName: string, accountNumber: number, emailAddress: string, identityNumber: number) => Promise<import("mongoose").Document<unknown, any, {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}> & {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
} & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const getAllUser: () => Promise<(import("mongoose").Document<unknown, any, {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}> & {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
} & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const getUserByUsername: (userName: string) => Promise<(import("mongoose").Document<unknown, any, {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}> & {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
} & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
export declare const getUserByAccountNumber: (accountNumber: number) => Promise<(import("mongoose").Document<unknown, any, {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}> & {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
} & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
declare class paramUpdateUser {
    userName?: string;
    accountNumber?: number;
    emailAddress?: string;
    identityNumber?: number;
}
export declare const updateUserByAccountNumber: (accountNumber: string, param: paramUpdateUser) => Promise<(import("mongoose").Document<unknown, any, {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}> & {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
} & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
export declare const updateUserById: (id: string, param: paramUpdateUser) => Promise<(import("mongoose").Document<unknown, any, {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}> & {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
} & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
export {};
