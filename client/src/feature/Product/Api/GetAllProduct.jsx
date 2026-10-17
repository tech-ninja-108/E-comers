import { axioxApi } from "../../../config/api";

export const AllProduct = async () => {
  const { data } = await axioxApi.get("/api/allproduct");
  return data.data;
};

export const singleProduct = async (id) => {
  const { data } = await axioxApi.get(`/api/product/${id}`);
  return data.data;
};
