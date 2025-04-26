export type LoginResponse = {
  success: boolean;
  message: string;
  data: Data;
};

interface Data {
  username: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}
