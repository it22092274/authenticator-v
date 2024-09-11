import { Iservice } from '../types/service.type';
import mongoose, { Schema, model} from 'mongoose'

// Create the Mongoose schema based on the Service type
const ServiceSchema: Schema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    fname: { type: String },
    lname: { type: String },
    dob: { type: String },
    gender: { type: String },
    country: { type: String },
    age: { type: Number },
    picture: { type: String },
    bio: { type: String },
    address: { type: String },
    key: { type: String },
    projectid: { type: String },
  });

  const ServicesModel = model<Iservice>('Service', ServiceSchema)

  export default ServicesModel