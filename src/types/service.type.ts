import { Document } from "mongoose";

export type Service = {
    username?: string,
    email?: string,
    password?: string,
    phone?: string,
    fname?: string,
    lname?: string,
    dob?: string,
    gender?: string,
    country?: string,
    age?: number,
    picture?: string,
    bio?: string,
    address?: string,
    key: string,
    projectid: string,
}

export interface Iservice extends Service, Document {}