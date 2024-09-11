import { conn } from "./config/db";
import express from "express";
import cors from  'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

conn()

app.listen(process.env.PORT || 3000, () => {
    console.log('server running');    
})