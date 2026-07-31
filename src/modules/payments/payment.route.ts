import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/",paymentController.verifyPayment)

router.post("/:id",auth(userRole.ADMIN,userRole.USER,userRole.TECHNICIAN),paymentController.createPayment)


router.get("/",auth(userRole.USER, userRole.TECHNICIAN, userRole.ADMIN),paymentController.getMyPayments);

router.get("/:id",auth(userRole.USER, userRole.TECHNICIAN, userRole.ADMIN),paymentController.getPaymentDetails);

export const paymentRouter = router