import { AuthService } from "@/app/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const user = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn:(data: { email: string; password: string }) => {
      return  AuthService.login(data.email, data.password);
    },
    onSuccess: (data) => {
      user(data);
    },
  });
};
