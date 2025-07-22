import mongoose from "mongoose";
const mainCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
},{timestamps:true});

export const MainCategory = mongoose.model('MainCategory', mainCategorySchema);
