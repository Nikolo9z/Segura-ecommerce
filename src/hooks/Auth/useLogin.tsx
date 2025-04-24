import { AuthService } from "@/app/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const user = useAuthStore((state) => state.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return AuthService.login(data.email, data.password);
    },
    onSuccess: (data) => {
      const { username, email, role } = data;
      user({ username, email, role });
      router.push("/");
    },
  });
};
