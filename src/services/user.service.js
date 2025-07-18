import { User } from "../models/user.model.js";
import bcrypt,{genSalt} from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const userAdding= async(req)=>{

    try {

        const {name,email,password,street,city,state,accountNumber,bankName,ifscCode} = req.body;
        
        // console.log(email);
        
        // fiding if user already exits
        const existUser = await User.findOne({email});
        if(existUser){
            throw new Error('User already exists');
        }

        const salt = await genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

       


        // create new User
        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
            street,
            city,
            state,
            accountNumber,
            bankName,
            ifscCode

        });

         // generate token 
        const accessToken =  generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        newUser.refreshToken = refreshToken;


        // saving user in db
        const savedUser = await newUser.save();
        const user= savedUser.toObject();
        delete user.refreshToken;
        delete user.password;
        // console.log(user,'sUser');
        
        return {user,accessToken,refreshToken};


    } catch (error) {
        throw new Error(error.message);
    }

};


export const userDetailsService = async (req) => {
    
    try {
        const id = req.user.id;
        const user = await User.findById(id).select('-password -refreshToken');
        if(!user){
             throw new Error('User not found');
        }

        return user;

    } catch (error) {
     throw new Error(error.message);   
    }
}