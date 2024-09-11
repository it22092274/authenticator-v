import { IUsers } from './../types/users.type';
import mongoose, { Schema, model} from 'mongoose'

// Create the Mongoose schema based on the Service type
const UserSchema: Schema = new Schema({
    email: { type: String },
    password: { type: String },
    fname: { type: String },
    lname: { type: String },
    picture: { type: String },
  });

  const UserModel = model<IUsers>('User', UserSchema)

  export default UserModel