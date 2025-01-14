import { User } from "@prisma/client"
import { prismaClient } from "../applications/database"
import { logger } from "../applications/logging"
import { ResponseError } from "../errors/response-error"
import {
    toUserResponse,
    RegisterUserRequest,
    UserResponse,
    LoginUserRequest,
} from "../models/user-model"

import { UserValidation } from "../validations/user-validation"
import { Validation } from "../validations/validation"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export class UserService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        // validate request
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        )

        const email = await prismaClient.user.findFirst({
            where: {
                email: registerRequest.email,
            },
        })

        if (email) {
            throw new ResponseError(400, "Email already exists!")
        }

        // encrypt password
        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        )

        // add user to db
        const user = await prismaClient.user.create({
            data: {
                firstName: registerRequest.firstName,
                lastName: registerRequest.lastName,
                username: registerRequest.firstName + ' ' + registerRequest.lastName, // Combine first and last name
                email: registerRequest.email,
                password: registerRequest.password,
                token: uuid(),
                NIM: registerRequest.NIM,
                licensePlate: registerRequest.licensePlate,
                SIM: registerRequest.SIM
            },
          })
          
        // const user = await prismaClient.user.create({
        //     data: {
        //         username: registerRequest.firstName + ' ' + registerRequest.lastName,
        //         email: registerRequest.email,
        //         password: registerRequest.password,
        //         token: uuid(),
        //         NIM: registerRequest.NIM,
        //         licensePlate: registerRequest.licensePlate,
        //         SIM: registerRequest.SIM
        //     },
        // })

        // convert user to UserResponse and return it
        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            },
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
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
        const result = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: null,
            },
        })

        return "Logout Successful!"
    }
}
