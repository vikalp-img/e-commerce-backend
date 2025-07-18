import mongoose from 'mongoose'

export const connectDb = async ()=>{
   try {
    const con= await mongoose.connect(process.env.MONGO_URL);
   console.log(con.connection.host ,"Connected");
   } catch (error) {
    console.log('Error while connecting to MongoDb',error)
    process.exit(1);
   }
   
}