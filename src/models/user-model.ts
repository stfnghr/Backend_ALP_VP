import { User } from "@prisma/client";

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  NIM: string;
  licensePlate: string;
  SIM: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  token?: string;
  email: string;
}

export function toUserResponse(user: User): UserResponse {
  return {
    token: user.token ?? "",
    email: user.email,
  };
}
