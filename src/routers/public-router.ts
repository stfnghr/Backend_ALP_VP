import express from "express"
import { SignupController } from "../controllers/signup-controller"
import { LoginController } from "../controllers/login-controller"

export const publicRouter = express.Router()

//public routes
publicRouter.post("/api/login", LoginController.login)
publicRouter.post("/api/signup", SignupController.signup)