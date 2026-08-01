import axios from "axios";
import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import initiatePayment from "./payment.checkout";
import config from "../../config";
import { calculatePagination } from "../../utils/pagination";
import { paginationI } from "../technician/technician.interface";

const createPayment =async(bookingId:string,userId :string)=>{
    const bookingInfo  = await prisma.bookings.findUnique({
        where : {
            id : bookingId
        },
        include :{
            customer : true,
            
        }
        
    })

    
    if(!bookingInfo){
        throw new Error("Your Not booking")
    }
    
    const bookingUserId = bookingInfo?.customer.id;

    if(userId !== bookingUserId){
        throw new Error("You Don't Owner is booking")
    };

    // validation 

    if(bookingInfo.stats !== "ACCEPTED"){
        throw new Error("Cannot proceed with payment because the booking is not accepted.");
    }

    const user = bookingInfo?.customer as User;
    
    const { customer, ...bookingData } = bookingInfo!;
    
    
    const checkout = await initiatePayment(bookingData,user)

    return {checkout}
}


const verifyPayment =async(bookingId : string,tranId: string,status:string,payload:any)=>{

    const valId = payload.val_id;
    const storeId = config.ssl_comarz_store_id;
    const storePassword = config.ssl_comarz_store_password

    const response = await axios.post(`https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${storeId}&store_passwd=${storePassword}&format=json`,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })

console.log(response);
    if(response.data.status === "VALID"){
        await prisma.bookings.update({
        where : {
            id : bookingId
        },
        data :{
            stats : "IN_PROGRESS"
        }
    })

    await prisma.payments.update({
        where : {
            bookingId
        },
        data : {
            status : "PAID",
            provider : response.data.card_issuer,
            paidAt : new Date(),
            meta : payload 
        }
    })
    }else if(response.data.status === "FAILED"){
    //             await prisma.bookings.update({
    //     where : {
    //         id : bookingId
    //     },
    //     data :{
    //         stats : "COMPLETED"
    //     }
    // })

    await prisma.payments.update({
        where : {
            bookingId
        },
        data : {
            status : "FAILED",
            provider : response.data.card_issuer,
            paidAt : new Date(),
            meta : payload 
        }
    })
    }

    return status
}

// login use payment 

const getMyPaymentsFromDB = async (userId: string, options: paginationI) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
console.log(userId);
  const payments = await prisma.payments.findMany({
    where: {
      booking: {
        customerId: userId,   
      },
    },
    omit:{
        meta : true
      },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.payments.count({
    where: { booking: { customerId: userId } },
  });

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data: payments,
  };
};

const getPaymentDetailsFromDB = async (
  paymentId: string,
  authUser: { id: string; role: string }
) => {
  const payment = await prisma.payments.findUnique({
    where: { id: paymentId },
    include: {
      booking: {
        include: {
          customer: { select: { id: true, name: true, email: true } },
          technician: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
      },
    },
    omit:{
        meta : true
    }
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const isCustomer = payment.booking.customerId === authUser.id;
  const isTechnician = payment.booking.technician?.userId === authUser.id;
  const isAdmin = authUser.role === "ADMIN";

  if (!isCustomer && !isTechnician && !isAdmin) {
    throw new Error("You are not authorized to view this payment");
  }

  return payment;
};

export const paymentService ={
    createPayment,
    verifyPayment,
    getMyPaymentsFromDB,
    getPaymentDetailsFromDB
}