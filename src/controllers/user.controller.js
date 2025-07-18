import { sendResponse } from "../helper/response.js";
import { userAdding, userDetailsService } from "../services/user.service.js"
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
        res.status(200).json({message:'user details',data:user});
        
    } catch (error) {
        res.status(500).json({message:'error getting user details',error:error.message})
    }
}
