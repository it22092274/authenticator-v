import { Document } from "mongoose";

export type users = {
    email: string,
    password: string,
    picture: string,
    fname: string,
    lname: string,
}

export interface IUsers extends users, Document {}