import { prisma } from "../../lib/prisma";
import { authI, IBooking } from "./bookings.interface";

const createBookingIntoDB = async(payload:IBooking,customerId : string)=>{
    const {notes,scheduledDate,serviceId,technicianId}= payload;

    const isExistTechnician = await prisma.technicianProfiles.findUnique({
        where : {
            id : technicianId
        }
    });

    if(!isExistTechnician){
        throw new Error("This Technician is not exist.")
    };

    const isExistService = await prisma.services.findUnique({
        where:{
            id : serviceId
        }
    });

    if(!isExistService){
        throw new Error("This service is not exist")
    };

    if(isExistService.technicianId !== technicianId){
        throw new Error("This Technician is not provide this service")
    };

    const totalAmount = isExistService.price;

    const booking = await prisma.bookings.create({
        data :{
            customerId,
            totalAmount,
            ...payload
        }
    });

    return booking
};


const getBookingWithUser =async(customerId : string)=>{
    const bookings = await prisma.bookings.findMany({
        where : {
            customerId 
        }
    });

    return bookings
};



const getBookingDetails = async (bookingId: string,authUser : authI) => {
    
  const booking = await prisma.bookings.findUnique({
    where: { id: bookingId },
    include: {
      customer: {
        select: { id: true, name: true, email: true, phone: true },
      },
      technician: {
        include: {
          user: {
            select: { id: true, name: true, email: true, phone: true },
          },
        },
      },
      service: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }
  const isCustomer = booking.customerId === authUser.id;
  const isTechnician = booking.technician?.userId === authUser.id;
  const isAdmin = authUser.role === "ADMIN";

  if (!isCustomer && !isTechnician && !isAdmin) {
    throw new Error("You are not authorized to view this booking");
  }


  return booking;
};



export const bookingsService ={
    createBookingIntoDB,
    getBookingWithUser,
    getBookingDetails,
}