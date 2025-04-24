import { User } from "@/types/user";
import { IAuthService } from "./interfaces/IAuthService";

const api_url = "http://localhost:5068";

export const AuthService: IAuthService = {
    
  login: function (email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/User/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
    throw new Error("Function not implemented.");
  },
  register: function (email: string, password: string): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
