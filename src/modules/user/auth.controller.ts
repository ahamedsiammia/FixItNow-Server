import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus from "http-status";
import { IUser } from "./auth.interface";

const createUser =async(req:Request,res:Response)=>{
    try {

    const payload  = req.body;

    const result = await authService.createUserIntoDB(payload as IUser);
    
    sendResponse(res,{
        success: true,
        statusCode : HttpStatus.CREATED,
        message : "User Create Successfully",
        data : {
            result
        },
    })
    
    } catch (error : any) {
        sendResponse(res,{
            success : false,
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message : error.message,
            data : [],
            error : {error}
        })
    }
};



const loginUser = async(req:Request,res:Response)=>{
    try {

        const payload = req.body;

        const user = await authService.loginUserIntoDB(payload)
                const accessToken = user.accessToken
                const refreshToken = user.refreshToken

        res.cookie("accessToken",accessToken,{
            httpOnly: true,
            secure : false,
            sameSite: "none",
            maxAge : 1000 * 60 * 60 * 24  // 1 day or 24 hours
        })

        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure : false,
            sameSite: "none",
            maxAge : 1000 * 60 * 60 * 24 * 7  // 7 day
        })
        
        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Your login successfully",
            data : user
        })
        
    } catch (error : any) {
        sendResponse(res,{
            success : false,
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message : error.message,
            data : [],
            error : {error}
        })
    }
}


const getMe =async(req:Request,res:Response)=>{
    try {

        const userId = req.user?.id as string

        const user = await authService.getMeIntoDB(userId);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Your profile retrieved Successfully",
            data : user
        })
        
    } catch (error : any) {
        sendResponse(res,{
            success : false,
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message : error.message,
            data : [],
            error : {error}
        })
    }
}




export const authController ={
    createUser,
    loginUser,
    getMe,
}