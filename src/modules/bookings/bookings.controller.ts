import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { bookingsService } from "./bookings.service";
import { authI } from "./bookings.interface";

const createBooking = async(req:Request,res:Response)=>{
    try {

        const payload = req.body;
        const customerId = req.user?.id as string;

        const booking = await bookingsService.createBookingIntoDB(payload,customerId);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.CREATED,
            message :"your booking create successfully",
            data : booking
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


const getBookingsWithUsers = async(req:Request,res:Response)=>{
    try {

        const customerId = req.user?.id as string;

        const bookings =await bookingsService.getBookingWithUser(customerId);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : `${bookings.length === 0 ? "Your are Not booking any service" :"Your booking retrieved successfully"}`,
            data : bookings
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


const getBookingDetails =async(req:Request,res:Response)=>{
    try {

        const bookingId = req.params?.id as string;

        const authUser = req.user as authI;

        const bookingDetails = await bookingsService.getBookingDetails(bookingId,authUser);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message :"Your booking details retrieved successfully",
            data : bookingDetails
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

export const bookingsController = {
    createBooking,
    getBookingsWithUsers,
    getBookingDetails
}