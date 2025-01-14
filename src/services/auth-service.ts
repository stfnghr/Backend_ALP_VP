import { User } from "@prisma/client";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { LoginUserRequest, RegisterUserRequest, UserResponse, toUserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bycrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  static async register(req: RegisterUserRequest): Promise<UserResponse> {
    const registerReq = Validation.validate(UserValidation.REGISTER, req);

    const email = await prismaClient.user.findFirst({
      where: {
        email: registerReq.email,
      },
    });

    if (email) {
      throw new ResponseError(400, "Email already exists!");
    }

    registerReq.password = await bycrypt.hash(registerReq.password, 10);

    const user = await prismaClient.user.create({
        data: {
          firstName: registerReq.firstName,
          lastName: registerReq.lastName,
          username: registerReq.firstName + ' ' + registerReq.lastName, // Combine first and last name
          email: registerReq.email,
          password: registerReq.password,
          token: uuid(),
          NIM: registerReq.NIM,
          licensePlate: registerReq.licensePlate,
          SIM: registerReq.SIM
        }
    })

    return toUserResponse(user)
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findFirst({
      where: {
        email: loginRequest.email,
      },
    })

    if (!user){
      throw new ResponseError(400, "Invalid email or password!")
    }

    const passwordIsValid = await bycrypt.compare(
      loginRequest.password,
      user.password
    )

    if (!passwordIsValid){
      throw new ResponseError(400, "Invalid email or password!")
    }

    user = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: uuid(),
      },
    })

    const response = toUserResponse(user)

    return response
  }

  static async logout(user: User): Promise<string> {
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
         token: null,
      },
    })

    return "Logout Successful!"
  }

  static async delete(user: User): Promise<string> {
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
         token: null,
      },
    })

    return "Delete Account Successful!"
  }
}
