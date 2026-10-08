import axios from "axios";
export const axioxApi = axios.create({
  baseURL: "https://e-comers-0isu.onrender.com/api",
  withCredentials: true,
});
