import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router();

router.post("/create-profile",technicianController.createTechnician)


router.put("/profile",auth(userRole.TECHNICIAN),technicianController.updateTechnicianProfile)

router.post("/services",auth(userRole.TECHNICIAN),technicianController.createService)

router.get("/bookings",auth(userRole.TECHNICIAN),technicianController.getBookings)

router.patch("/bookings/:id",auth(userRole.TECHNICIAN),technicianController.updateBookingStatus)

// Public api

router.get("/",technicianController.getAllTechnician);

router.get("/:id",technicianController.getSingleTechnician)





export const technicianRouter = router;  