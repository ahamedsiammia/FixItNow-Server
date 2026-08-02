import cookieParser from "cookie-parser";
import { Application, Request, Response } from "express";
import express from "express"
import cors from "cors"
import config from "./config";
import { authRouter } from "./modules/user/auth.route";
import { technicianRouter } from "./modules/technician/technician.route";
import { reviewsRouter } from "./modules/reviews/reviews.route";
import { AdminRoute } from "./modules/admin/admin.route";
import { categoriesRoute } from "./modules/categories/categories.route";
import { servicesRouter } from "./modules/services/services.route";
import { bookingsRouter } from "./modules/bookings/bookings.router";
import { paymentRouter } from "./modules/payments/payment.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { POST } from "./modules/aichatbort/ai";

const app : Application =  express();


app.use(cors({
    origin : config.app_url,
    credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())



app.use("/api/auth",authRouter);

app.use("/api/technician",technicianRouter);

app.use("/api/reviews",reviewsRouter);

app.use("/api/admin",AdminRoute);

app.use("/api/categories",categoriesRoute);

app.use("/api/services",servicesRouter);

app.use("/api/bookings",bookingsRouter);

app.use("/api/payment",paymentRouter)

app.post("/api/ai",POST )


app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success : true,
        message : "Welcome to FixItNow Server . pleas visit server provied and review ",
        builder : "Siam Ahamed"
    })
})

app.use(globalErrorHandler);


export default app;