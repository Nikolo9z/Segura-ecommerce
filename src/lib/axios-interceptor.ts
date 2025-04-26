import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { AuthService } from "@/services/AuthService";
import { useAuthStore } from "@/stores/AuthStore";

// Crear instancia de axios con configuración común
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Importante para manejar cookies automáticamente
  headers: {
    "Content-Type": "application/json",
  },
});

// Variable para controlar si ya estamos en proceso de refresh
let isRefreshing = false;
// Cola de solicitudes pendientes que esperan un token nuevo
let failedQueue: any[] = [];

// Procesar la cola de solicitudes pendientes
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Configurar interceptor de respuesta
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Verificar si es un error 401 (Unauthorized) y que no se haya intentado retry ya
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Si ya estamos refrescando, agregar esta solicitud a la cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Intentar hacer refresh del token
        // Como accessToken y refreshToken son cookies manejadas automáticamente,
        // no necesitamos pasarlas explícitamente
        const response = await AuthService.refresh();

        // Si el refresh fue exitoso, procesamos la cola de solicitudes pendientes
        processQueue(null, response.data.accessToken);

        // Reintentar la solicitud original
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, rechazar todas las solicitudes en la cola
        processQueue(refreshError as AxiosError);

        // Hacer logout para limpiar el estado de autenticación
        const logout = useAuthStore.getState().logout;
        logout();

        // Redireccionar a la página de login, si estamos en el navegador
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Si no es un error 401 o ya se intentó retry, devolver el error
    return Promise.reject(error);
  }
);

export default apiClient;
