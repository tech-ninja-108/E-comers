import { Plus, X } from "lucide-react";
import { AddProducts } from "../../hooks/AddProduct";
import { useEffect, useState } from "react";
import VariantUI from "./VariantUI";
import ProductData from "./ProductData";

const AddyaDelete = ({
  settoggleCard,
  toggleCard,
  productData,
  productId,
  setProductId,
}) => {
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400";

  const [images, setImages] = useState([]);
  const { handleSubmit, register, ProductHandal, setValue, reset } =
    AddProducts(productId);
  const [varients, setVarients] = useState([]);
  const [varient, setVarient] = useState({
    color: "",
    size: "",
    stock: "",
    mrp: "",
    price: "",
  });

  const ResetForm = () => {
    settoggleCard(!toggleCard);
    reset();
    setImages([]);
    setVarients([]);
    setVarient({
      color: "",
      size: "",
      stock: "",
      mrp: "",
      price: "",
    });
    settoggleCard(false);
    setProductId(null);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages((prev) => {
      const updatedImages = [...prev, ...selectedImages].slice(0, 5);

      setValue("images", updatedImages);

      return updatedImages;
    });

    e.target.value = "";
  };

  const onSubmits = async (data) => {
    const filledData = {
      ...data,
      images,
      varients,
    };

    const success = await ProductHandal(filledData);
    if (success) {
      ResetForm();
    }
  };
  // console.log(imgs);
  useEffect(() => {
    const product = productData?.data;

    // Sirf update mode mein data bharo
    if (productId == null || !product) return;

    setValue("brand", product.brand || "");
    setValue("category", product.category?._id || product.category || "");
    setValue("description", product.description || "");
    setValue(
      "tags",
      Array.isArray(product.tags)
        ? product.tags.join(", ")
        : product.tags || "",
    );
    setValue("title", product.title || "");

    setImages(product.images || []);
    setVarients(product.variants || []);

    setVarient(
      product.variants?.[0] || {
        color: "",
        size: "",
        stock: "",
        mrp: "",
        price: "",
      },
    );
  }, [productId, productData, setValue]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900/50 p-4 backdrop-blur-sm scroll-m-0">
      <div className="my-auto max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-5">
          <div>
            <h2 className="text-lg font-bold">Add New Product</h2>
            <p className="mt-1 text-sm text-gray-500">
              Product details and variants
            </p>
          </div>
          <button
            onClick={() => ResetForm()}
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmits)} className="space-y-5 p-5">
          <ProductData
            images={images}
            setImages={setImages}
            handleImageChange={handleImageChange}
            register={register}
            inputClass={inputClass}
          />
          {/* //vatient add */}
          <VariantUI
            varient={varient}
            varients={varients}
            setVarient={setVarient}
            setVarients={setVarients}
          />
          <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <button
              onClick={() => ResetForm()}
              type="button"
              className="rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 cursor-pointer"
            >
              <Plus size={17} />{" "}
              {productId == null ? "Create Product" : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddyaDelete;
