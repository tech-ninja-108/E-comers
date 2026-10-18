import axios from "axios";
import { toast } from "react-toastify";
export const axioxApi = axios.create({
  baseURL: "https://e-comers-0isu.onrender.com",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
});

axioxApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axioxApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const req = error.config;

    if (
      error.response?.status === 401 &&
      !req._retry &&
      !req.url?.includes("/auth/refresh-token")
    ) {
      req._retry = true;

      try {
        const { data } = await axioxApi.post("/api/auth/refresh-token");
        const token = sessionStorage.setItem("accessToken", data.accessToken);
        if (token) {
          req.headers.authorization = data.accessToken;
        }

        return axioxApi(req);
      } catch (err) {
        toast.error(err.response?.data.message);
      }
    }

    return Promise.reject(error);
  },
);
