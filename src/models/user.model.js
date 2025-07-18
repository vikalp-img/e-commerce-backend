import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    accountNumber:{
        type:Number,
        required:true
    },
    bankName:{
        type:String,
        required:true
    },
    ifscCode:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }

    
});

export const User = mongoose.model('User',userSchema);