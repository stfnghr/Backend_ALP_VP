import { NextFunction } from "express";
import { UserRequest } from "../types/user-request";
import { LoginUserRequest } from "../models/user-model";
import { UserService } from "../services/auth-service";
import { Response } from "express";

export class LoginController {
  static async login(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const loginRequest: LoginUserRequest = req.body;
      const user = await UserService.login(loginRequest);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
