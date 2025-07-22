import { sendResponse } from "../helper/response.js";
import { loginService, userAdding, userDetailsService } from "../services/user.service.js"
import { addToCookie } from "../utils/addToCookie.js";

export const addUser = async(req,res)=>{
    
    try {
        
        const {user,accessToken,refreshToken} = await userAdding(req);
        
        addToCookie(res,refreshToken);
       
       
        sendResponse(res,200,true,'user added successfully',{accessToken});
        // res.status(200).json({message:'user added successfully',data:{accessToken},success:true})

    } catch (error) {
        sendResponse(res,500,false,'error adding user',{error});
        // res.status(500).json({message:'error adding user',error:error.message,success:false})
    }
};

export const userDetails =async(req,res)=>{

    try {

        const user = await userDetailsService(req);
        sendResponse(res,200,true,'user details fetched successfully',{user});
        // res.status(200).json({message:'user details',data:user});
        
    } catch (error) {
        sendResponse(res,500,false,'error getting user details',{error});
        // res.status(500).json({message:'error getting user details',error:error.message})
    }
}


export const login = async (req,res) => {
    try {
        
        const {user,accessToken,refreshToken} = await loginService(req);
        
        addToCookie(res,refreshToken);
        console.log(refreshToken,'refreshTokenInLogin');
        
        sendResponse(res,200,true,'user logged in successfully',accessToken);
        // res.status(200).json({message:'user logged in successfully',data:{accessToken},success:true})

    } catch (error) {
        // sendResponse(res,500,false,'error logging in user',error);
        res.status(500).json({message:'error logging in user',error:error.message,success:false})
    }
}

export const logout = (req,res) => {
    try {
        res.clearCookie('refreshToken');
        sendResponse(res,200,true,'user logged out successfully');
        // res.status(200).json({message:'user logged out successfully',success:true})
    } catch (error) {
        sendResponse(res,500,false,'error logging out user',error);
        // res.status(500).json({message:'error logging out user',error:error.message,success:false})
    }
}