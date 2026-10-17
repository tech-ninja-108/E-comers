import { useQuery } from "@tanstack/react-query";
import { AllProduct, singleProduct } from "../Api/GetAllProduct";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: AllProduct,
  });
};

export const getSingleProduct = (id) => {
    console.log(id);
    
  return useQuery({
    queryKey: ["product"],
    queryFn: () => singleProduct(id),
  });
};
