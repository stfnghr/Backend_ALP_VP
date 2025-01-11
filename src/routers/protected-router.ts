import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { ReservationController } from "../controllers/reservation-controller";
import { ReportController } from "../controllers/report-controller";
import { PenaltyController } from "../controllers/penalty-controller";


export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

//protected routes
protectedRouter.post("/api/createReservation", ReservationController.createReservation)
protectedRouter.get("/api/getReservation/:id", ReservationController.getReservation)
protectedRouter.get("/api/getReservations", ReservationController.getReservations)
protectedRouter.post("/api/createReport", ReportController.createReport)
protectedRouter.get("/api/getReport/:id", ReportController.getReportById)
protectedRouter.get("/api/getReports", ReportController.getReports)
protectedRouter.post("/api/createPenalty", PenaltyController.createPenalty)
protectedRouter.get("/api/getPenalty/:id", PenaltyController.getPenaltyById)
protectedRouter.get("/api/getPenalties", PenaltyController.getPenalties)