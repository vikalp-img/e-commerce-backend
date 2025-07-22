import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDb } from './config/dbConnection.js';
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config();
const app=express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser())
app.set('view engine', 'ejs');

app.use('/api',userRouter);
app.use('/api/admin',adminRouter);

const PORT = process.env.PORT || 3000
connectDb().then(()=>{
    console.log(`MongoDb Connection Successfull`);
    
    app.listen(PORT,()=>console.log(`Server started at ${PORT}`))
}).catch((err)=>{
console.log(err,'error connecting MONGODB');

})