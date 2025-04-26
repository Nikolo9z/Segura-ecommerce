import { LoginResponse } from "@/types/DTOs/LoginResponse";
import { IAuthService } from "./interfaces/IAuthService";
import { RegisterRequest } from "@/types/DTOs/RegisterRequest";
import { RegisterResponse } from "@/types/DTOs/RegisterResponse";
import { apiClient } from "@/lib/axios-interceptor";

export const AuthService: IAuthService = {
  login: function (email: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/User/login", { email, password })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  logout: function (): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/User/logout")
        .then((response) => resolve(true))
        .catch((error) => reject(error));
    });
  },
  register: function (register: RegisterRequest): Promise<RegisterResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/User/register", register)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  refresh: function (): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post(
          "/User/refresh",
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};
