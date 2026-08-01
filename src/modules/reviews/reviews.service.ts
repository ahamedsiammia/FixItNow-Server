import { prisma } from "../../lib/prisma";
import { IReview } from "./reviews.interface";

const createReviewsIntoDB = async(payload : IReview,customerId : string)=>{

    const {bookingId,technicianId,rating,comment} = payload;
    
    if(!bookingId && !technicianId && !rating){
        throw new Error("please porvied bookingId && technicianId && rating")
    }

    const isExistBooking = await prisma.bookings.findUnique({
        where : {
            id : bookingId
        }
    });

    const isExistTechnician = await prisma.technicianProfiles.findUnique({
        where : {
            id : technicianId
        }
    });

    if(!isExistTechnician){
        throw new Error("This Technician is not Exist")
    }
   
    if(!isExistBooking){
        throw new Error("This Booking is not Exist")
    }

        const review = await prisma.reviews.create({
            data :{
                customerId,
                ...payload
            }
        });

        return review
};


export const reviewsService = {
    createReviewsIntoDB
}