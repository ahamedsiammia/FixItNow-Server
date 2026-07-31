import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { paymentService } from "./payment.service";
import { paginationI } from "../technician/technician.interface";

const createPayment =async(req:Request,res:Response)=>{
    try {

        const bookingId = req.params?.id as string;
        const userId = req.user?.id as string;

        const payment = await paymentService.createPayment(bookingId,userId)

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Payment checkout retrived successfully",
            data : payment.checkout.GatewayPageURL
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


const verifyPayment =async(req:Request,res:Response)=>{
    try {

        const {bookingId,tranId,status}=req.query;
        const payload = req.body;

        // console.log("form verify payment ",req.body,bookingId,tranId,status);

        const response = await paymentService.verifyPayment(bookingId as string,tranId as string,status as string,payload)
console.log(response,"this is payment response");
        if(response === "success"){
            return res.redirect("https://siamahamed.netlify.app")
        }else if(response === "fail"){
            return res.redirect("https://www.memberstack.com/webflow/failed-payment-page?utm_source=Pinterest&utm_medium=organic")
        }else if(response === "cancel") res.redirect("/payment/cancel")
        
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

// login user payment

const getMyPayments = async (req: Request, res: Response) => {
  try {
      const userId = req.user?.id as string;
  const options: paginationI = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as "asc" | "desc",
  };

  const result = await paymentService.getMyPaymentsFromDB(userId, options);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Payment history retrieved successfully",
    data: result,
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
};


const getPaymentDetails = async (req: Request, res: Response) => {
try {
      const  id  = req.params?.id as string;
  const authUser = req.user!;

  const result = await paymentService.getPaymentDetailsFromDB(id, {
    id: authUser.id,
    role: authUser.role,
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Payment details retrieved successfully",
    data: result,
  });
}  catch (error : any) {
        sendResponse(res,{
            success : false,
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message : error.message,
            data : [],
            error : {error}
        })
    }
};

export const paymentController ={
    createPayment,
    verifyPayment,
    getMyPayments,
    getPaymentDetails
}