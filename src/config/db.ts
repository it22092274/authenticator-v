import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

export function conn(){
    mongoose.connect(process.env.MONGODB_URI as string)
        .then(() => {
            console.log("connected");
        })
        .catch( e => {
            console.log('connection error', e);
            
        })
}