import { Document, Types } from "mongoose"
import { IUsers } from "./users.type"

export type project = {
    userId: IUsers,
    projectname: string,
    apiKey: string,
    collaborator: Types.Array<IUsers>,

}

export interface IProject extends project, Document {}