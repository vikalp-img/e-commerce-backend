import jwt from 'jsonwebtoken';

export const generateAccessToken = (id)=>{
    const token = jwt.sign({id},process.env.JWT_ACCESS_SECRET,{
        expiresIn:'20m'
    });

    return token;
};

export const generateRefreshToken =(id)=>{
    const token = jwt.sign({id},process.env.JWT_REFRESH_SECRET,{
        expiresIn:'7d'
    });

    return token;
};