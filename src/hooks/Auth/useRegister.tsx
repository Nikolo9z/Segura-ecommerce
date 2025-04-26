import { AuthService } from "@/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { RegisterRequest } from "@/types/DTOs/RegisterRequest";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const user = useAuthStore((state) => state.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterRequest) => {
      return AuthService.register(data);
    },
    onSuccess: (data) => {
      const { username, email, role } = data.data;
      if (role === "client" || role === "admin") {
        user({ username, email, role });
      } else {
        console.error("Invalid role received:", role);
      }
      router.push("/");
    },
  });
};
