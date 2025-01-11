import { NextFunction } from "express";
import { UserRequest } from "../types/user-request";
import { RegisterUserRequest } from "../models/user-model";
import { UserService } from "../services/auth-service";
import { Response } from "express";

export class SignupController {
  static async signup(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const registerRequest: RegisterUserRequest = req.body;
      const user = await UserService.register(registerRequest);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
