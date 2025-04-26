import { RegisterRequest } from "@/types/DTOs/RegisterRequest";
import { RegisterResponse } from "@/types/DTOs/RegisterResponse";
import { LoginResponse } from "@/types/DTOs/LoginResponse";

export interface IAuthService {
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<any>;
  register: (register: RegisterRequest) => Promise<RegisterResponse>;
}
