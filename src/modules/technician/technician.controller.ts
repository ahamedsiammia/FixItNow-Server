import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus from "http-status";
import { technicianService } from "./technician.service";
import { filteringI, paginationI } from "./technician.interface";

const createTechnician =async(req:Request,res:Response)=>{
    try {

        const payload = req.body;


        // if(!userId){
        //     sendResponse(res,{
        //     success: false,
        //     statusCode:HttpStatus.UNAUTHORIZED,
        //     message : " Your not Logged In . Please Logged in to access to this Resource.",
        //     data : []
        // })    
        // }

        const result = await technicianService.createTechnicianProfile(payload);

        sendResponse(res,{
            success: true,
            statusCode:HttpStatus.CREATED,
            message : "Technician Profile Create Successfully.",
            data : result
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

const updateTechnicianProfile =async(req:Request,res:Response)=>{
    try {

        const payload = req.body;
        const userId = req.user?.id as string
        const updateUser = await technicianService.updateTechnicianProfile(payload,userId);
        
        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.UPGRADE_REQUIRED,
            message :"Your profile Update successfully",
            data : updateUser
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


const getAllTechnician = async(req:Request,res:Response)=>{
    try {

    const payload: filteringI = {
    searchTerm: req.query.searchTerm as string,
    Rating: req.query.Rating ? Number(req.query.Rating) : undefined,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    experience: req.query.experience ? Number(req.query.experience) : undefined,
    availabilitySlots : req.query.availabilitySlots as string
  };

    const options: paginationI = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as "asc" | "desc",
  };

        const result = await technicianService.getAllTechnicianIntoDB(payload,options);

        if(result.data.length === 0){
        sendResponse(res,{
            success:true,
            statusCode : HttpStatus.OK,
            message :"No Data Yat",
            data : result
        })           
        }

        sendResponse(res,{
            success:true,
            statusCode : HttpStatus.OK,
            message :"Technician retrieved Successfully",
            data : result
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


const getSingleTechnician =async(req:Request,res:Response)=>{
    try {

        const id = req.params?.id as string;

        const technician = await technicianService.getSingleTechnician(id);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Technician profile Retrieved Successfully",
            data : technician
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


const createService = async(req:Request ,res:Response)=>{
    try {

        const payload = req.body;

        const userId = req.user?.id as string;

        const service = await technicianService.createServiceIntoDB(payload,userId);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.CREATED,
            message : "Service Create Successfully",
            data : service
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


const getBookings =async(req:Request,res:Response)=>{
    try {

        const userId = req.user?.id as string;

        const technicianBookings = await technicianService.getBookingsIntoDB(userId);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Your Bookings data retrieved successfully",
            data : technicianBookings
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

const updateBookingStatus =async(req:Request,res:Response)=>{
    try {

        const payload = req.body;
        const bookingId = req.params?.id as string;
        const userId = req.user?.id as string;

        const updateBooking = await technicianService.updateBookingStatusIntoDB(payload,bookingId,userId)
        
          sendResponse(res, {
             success: true,
             statusCode: HttpStatus.OK,
             message: "Booking status updated successfully",
             data: updateBooking,
         });

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

export const technicianController = {
    createTechnician,
    updateTechnicianProfile,
    getAllTechnician,
    getSingleTechnician,
    createService,
    getBookings,
    updateBookingStatus
}