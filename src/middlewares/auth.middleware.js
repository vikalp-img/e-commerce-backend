import jwt from 'jsonwebtoken'

export const protect = async(req,res,next)=>{

    try {
        
        let token;

        const authHeader = req.headers.authorization;

        if(authHeader && authHeader.startsWith('Bearer')){
            token = authHeader.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({message:'Not Authorized'})
        }

        const decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET);

        req.user = {id: decoded.id}

        next();

    } catch (error) {
        res.status(500).json({message:'error in authorization',error:error})
    }
}