import { axioxApi } from "../../../config/api";

export const userLogout = async () => {
  const res = await axioxApi.post("/api/auth/logout");
  return res;
};
