import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        ref:"MainCategory",
        required:true,
    },
    gender:{
        type:String,
    },
    subCategory:[{
        type:String,
    }],


},{timestamps:true}
);

export const Category = mongoose.model('Category', categorySchema);