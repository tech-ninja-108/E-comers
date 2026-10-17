import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddProduct,
  Categorys,
  DeleteProducts,
  GetSellerProduct,
  GetUpadateProduct,
  StatusUpdate,
  UpdateProduct,
} from "../Api/SellerProduct";
import { toast } from "react-toastify";

export const sellerProduct = () => {
  return useQuery({
    queryKey: ["sellerProduct"],
    queryFn: GetSellerProduct,
  });
};

export const addProduct = (product) => {
  return useMutation({
    mutationFn: () => AddProduct(product),
  });
};

export const ProductCategorys = () => {
  return useQuery({
    queryKey: ["Categorys"],
    queryFn: Categorys,
  });
};

export const UpdateStatus = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (id) => StatusUpdate(id),
    onSuccess: (res) => {
      queryclient.invalidateQueries({
        queryKey: ["sellerProduct"],
      });
      toast.success(res.message);
    },
  });
};

export const DeleteProduct = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: (id) => DeleteProducts(id),
    onSuccess: (res) => {
      queryclient.invalidateQueries({
        queryKey: ["sellerProduct"],
      });
      toast.success(res.message);
    },
  });
};

export const GetUpadateProductQurey = (id) => {
  return useQuery({
    queryKey: ["sellerrSingleProduct", id],
    queryFn: () => GetUpadateProduct(id),
    enabled: !!id,
  });
};

export const UpdateProductQuery = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (id) => UpdateProduct(id),
    onSuccess: (res) => {
      queryclient.invalidateQueries({
        queryKey: ["sellerProduct"],
      });
      toast.success(res.message);
    },
  });
};
