import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";

const router = Router();


router.post("/register",authController.createUser);

router.post("/login",authController.loginUser);

router.get("/me",auth(userRole.ADMIN,userRole.USER,userRole.TECHNICIAN),authController.getMe);


export const authRouter = router;