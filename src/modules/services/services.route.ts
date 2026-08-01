import { Router } from "express";
import { servicesController } from "./services.controller";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";

const router = Router();


router.get("/",servicesController.getAllServices)

router.get("/me",auth(userRole.TECHNICIAN),servicesController.getMyService)

export const servicesRouter = router;