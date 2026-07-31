import { Bookings, Payments, User } from "../../../generated/prisma/client"
import axios from "axios"
import config from "../../config";
import { prisma } from "../../lib/prisma";

const initiatePayment =async(booking :Bookings,user : User)=>{

    const tranId = `TRAN_ID_S_${Date.now()}`


    const paymentData = {
"store_id":config.ssl_comarz_store_id,
"store_passwd":config.ssl_comarz_store_password,
"total_amount":booking.totalAmount,
"currency":"BDT",
"tran_id":tranId,
"success_url":`${config.app_url}/api/payment?bookingId=${booking.id}&tranId=${tranId}&status=success`,
"fail_url":`${config.app_url}/api/payment?bookingId=${booking.id}&tranId=${tranId}&status=fail`,
"cancel_url":`${config.app_url}/api/payment?bookingId=${booking.id}&tranId=${tranId}&status=cancel`,
"cus_name":user.name,
"cus_email":user.email,
"cus_add1":user.address,
"cus_add2":user.address,
"cus_city":user.address,
"cus_state":user.address,
"cus_postcode":1000,
"cus_country":"Bangladesh",
"cus_phone":user.phone,
"cus_fax":"01711111111"
    };

     

    const response = await axios.post("https://sandbox.sslcommerz.com/gwprocess/v4/api.php",paymentData,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })

    const data = await response.data;
    console.log("initeate payment",data);
    const payment  = {
        bookingId : booking.id as string,
        transactionId : tranId as string,
        amount : booking.totalAmount as number,
        provider : "null" as string,
        
    }

    const checkExistPayment = await prisma.payments.findUnique({
        where : {
            bookingId : booking.id
        }
    });

    

    if(checkExistPayment){
        return data
    }

    await prisma.payments.create({
        data : {
            ...payment
        }
    })

    return data 
};


export default initiatePayment