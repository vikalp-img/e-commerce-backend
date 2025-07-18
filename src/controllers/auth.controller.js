import { sendResponse } from "../helper/response.js";
import { accesTokenService } from "../services/auth.service.js";

export const accessTokenRefresh =async(req,res)=>{

    try {
        // console.log(req.cookies,'backend cookie')
        const refreshToken = req.cookies?.refreshToken;
        // console.log(refreshToken,'refreshToken');
        
         const accessToken = await accesTokenService(refreshToken);
         sendResponse(res,200,true,'',accessToken)
        //  res.status(200).json({accessToken:accessToken});

    } catch (error) {
        const message = error.message
        sendResponse(res,401,false,message,message);
        // res.status(401).json({message:error.message})
    }
}