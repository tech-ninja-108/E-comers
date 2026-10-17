import { useForm } from "react-hook-form";
import { axioxApi } from "../../../config/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const AddProducts = (productId) => {
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      brand: "",
      category: "",
      tags: "",
      images: [],
      varients: [],
    },
  });
  const queryClient = useQueryClient();

  const ProductHandal = async (data) => {
    try {
      console.log("Form Data:", data);
      // Required form data
      if (
        !data.title?.trim() ||
        !data.description?.trim() ||
        !data.brand?.trim()
      ) {
        toast.info("Please fill title, description and brand");
        return;
      }

      // Images from your form
      const images = data.images || [];

      if (!images.length) {
        toString.info("Please upload at least one image");
        return;
      }
      if (!data.category || data.category === "Category") {
        toast.error("Please select a category");
        return;
      }

      // // Variants from your form
      if (!data.varients?.length) {
        toast.info("Please add at least one variant");
        return;
      }

      const tags = (data.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const variants = (data.varients || []).map((item) => ({
        color: item.color.trim(),
        size: item.size,
        stock: Number(item.stock),
        price: Number(item.price),
        mrp: Number(item.mrp),
        currency: "INR",
      }));

      // // Validate variants
      const invalidVariant = variants.some(
        (item) =>
          !item.color ||
          !item.size ||
          !Number.isFinite(item.stock) ||
          !Number.isFinite(item.price) ||
          !Number.isFinite(item.mrp) ||
          item.stock < 0 ||
          item.price <= 0 ||
          item.mrp <= 0 ||
          item.price > item.mrp,
      );

      if (invalidVariant) {
        toast.info("Please enter valid variant details");
        return;
      }

      const formData = new FormData();

      // Keep these fields from your form
      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());
      formData.append("brand", data.brand.trim());

      // Hardcoded fields
      formData.append("category", data.category);
      formData.append("tags", JSON.stringify(tags));

      // Images from your form
      const newImages = [];
      const existingImages = [];

      images.forEach((image) => {
        if (image instanceof File) {
          newImages.push(image);
        } else if (typeof image === "string") {
          existingImages.push(image);
        } else if (image?.url) {
          existingImages.push(image.url);
        }
      });

      newImages.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("existingImages", JSON.stringify(existingImages));
      // Variant values from your form
      formData.append("variants", JSON.stringify(variants));
      let response = null;
      if (!productId) {
        response = await toast.promise(
          axioxApi.post("/api/products", formData),
          {
            pending: "Product createing....",
            success: "Product create successfully",
            error: "Product create faill",
          },
        );
      } else {
        response = await toast.promise(
          axioxApi.put(`/api/products/${productId}`, formData),
          {
            pending: "Product updating....",
            success: "Product update successfully",
            error: "Product update faill",
          },
        );
      }

      if (response) {
        reset();

        queryClient.invalidateQueries({
          queryKey: ["sellerProduct"],
        });
      }

      return response;
    } catch (error) {
      console.error("Product Error:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
          "Product create nahi hua. Console check karo.",
      );
    }
  };

  return {
    handleSubmit,
    register,
    ProductHandal,
    setValue,
    reset,
  };
};
