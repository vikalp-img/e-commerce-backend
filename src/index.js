import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDb } from './config/dbConnection.js';
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config();
const app=express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser())

app.use('/api',userRouter);

const PORT = process.env.PORT || 3000
connectDb().then(()=>{
    console.log(`MongoDb Connection Successfull`);
    
    app.listen(PORT,()=>console.log(`Server started at ${PORT}`))
}).catch((err)=>{
console.log(err,'error connecting MONGODB');

})