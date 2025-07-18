import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';
import { generateAccessToken } from '../utils/token.js';
export const accesTokenService = async(refreshToken)=>{

    // console.log(refreshToken,'refreshToken');
    
    try {
        if(!refreshToken){
            throw new Error('refresh token not found login again')
        }
        const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.id);

        if(!user || refreshToken !==user.refreshToken){
            throw new Error('invalid refresh token login again');
        }

        const accessToken = generateAccessToken(user._id);
        // console.log(accessToken,'newAccessToken');
        
        return accessToken;


    } catch (error) {
       throw new Error(error.message);
    }
}