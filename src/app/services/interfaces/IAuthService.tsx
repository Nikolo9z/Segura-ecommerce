import { RegisterRequest } from "@/types/RegisterRequest";
import { RegisterResponse } from "@/types/RegisterResponse";
import { User } from "@/types/user";

export interface IAuthService {
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<any>;
  register: (register: RegisterRequest) => Promise<RegisterResponse>;
}
