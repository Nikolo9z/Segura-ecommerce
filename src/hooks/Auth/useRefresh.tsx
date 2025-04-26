import { AuthService } from "@/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRefresh = () => {
  const user = useAuthStore((state) => state.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: (accessToken: string) => {
      return AuthService.refresh(accessToken);
    },
    onSuccess: (data) => {
      const { username, email, role } = data.data;
      user({ username, email, role: role as "client" | "admin" });
      router.push("/");
    },
  });
};
