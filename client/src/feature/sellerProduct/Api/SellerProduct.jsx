import { axioxApi } from "../../../config/api";

export const GetSellerProduct = async () => {
  const { data } = await axioxApi.get("/api/products");
  return data.data;
};

export const AddProduct = async (product) => {
  const res = await axioxApi.post("/api/products", { product });
  return res;
};

export const Categorys = async () => {
  const { data } = await axioxApi.get("/category");
  return data.data;
};

export const StatusUpdate = async (id) => {
  const { data } = await axioxApi.patch(`/api/statusupdate/${id}`);
  return data;
};

export const DeleteProducts = async (id) => {
  const { data } = await axioxApi.delete(`/api/products/${id}`);
  return data;
};

export const GetUpadateProduct = async (id) => {
  const { data } = await axioxApi.get(`/api/singleproduct/${id}`);
  return data;
};

export const UpdateProduct = async (id) => {
  const { data } = await axioxApi.put(`/api/products/${id}`);
  return data;
};
