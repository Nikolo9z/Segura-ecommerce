import { AuthService } from "@/app/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router =useRouter();
  return useMutation({
    mutationFn: () => {
      return AuthService.logout();
    },
    onSuccess: () => {
        logout();
        router.push("/login");
    },
  });
};
