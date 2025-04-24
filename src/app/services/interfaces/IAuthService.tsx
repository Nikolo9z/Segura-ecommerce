import { User } from "@/types/user";

export interface IAuthService {
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
}