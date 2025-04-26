import { LoginResponse } from "@/types/DTOs/LoginResponse";
import { IAuthService } from "./interfaces/IAuthService";
import { RegisterRequest } from "@/types/DTOs/RegisterRequest";
import { RegisterResponse } from "@/types/DTOs/RegisterResponse";

const api_url = "http://localhost:5068";

export const AuthService: IAuthService = {
  login: function (email: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/User/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Login failed");
          }
          return response.json();
        })
        .then((user) => resolve(user))
        .catch((error) => reject(error));
    });
  },
  logout: function (): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/User/logout`, {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Logout failed");
          }
          return response.json();
        })
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  },
  register: function (register: RegisterRequest): Promise<RegisterResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/User/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Registration failed");
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
};
