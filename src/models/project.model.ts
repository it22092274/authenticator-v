import { IProject } from './../types/project.type';
import {Schema, model, Types, }  from 'mongoose'
import mongoose from 'mongoose';

// Create the Mongoose schema for project
const ProjectSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // Reference to the Users model
    projectname: { type: String, required: true },
    apiKey: { type: String, required: true },
    collaborator: [{ type: Schema.Types.ObjectId, ref: 'Users' }], // Array of references to Users
});

// Create and export the Mongoose model
export default mongoose.model<IProject>('Project', ProjectSchema);