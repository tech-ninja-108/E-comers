import { ImagePlus, Tag, X } from "lucide-react";
import { ProductCategorys } from "../../hooks/SellerQury";

const ProductData = ({
  images,
  setImages,
  handleImageChange,
  register,
  inputClass,
}) => {
  const { data, isPending } = ProductCategorys();
  return (
    <>
      {" "}
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Product Images (Maximum 5)
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {images?.map((image, index) => {
            const imageSrc =
              image instanceof File
                ? URL.createObjectURL(image)
                : typeof image === "string"
                  ? image
                  : image.url;

            return (
              <div
                key={index}
                className="relative h-32 overflow-hidden rounded-xl border"
              >
                <img
                  src={imageSrc}
                  alt="Product"
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute right-2 top-2 rounded-full bg-white p-1 text-red-500 shadow"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}

          {images?.length < 5 && (
            <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-orange-50">
              <ImagePlus size={26} className="text-orange-500" />

              <span className="mt-2 text-xs font-medium">Add Photo</span>

              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          {images?.length}/5 photos selected
        </p>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Product Title *
        </label>
        <input
          {...register("title")}
          placeholder="Product name"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="Describe your product..."
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Brand *</label>
          <input
            {...register("brand")}
            placeholder="Brand name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Category *</label>
          <select {...register("category")} className={inputClass}>
            <option value="">Select Category</option>
            {isPending
              ? "Loading..."
              : data.map((val) => (
                  <option value={val._id} key={val._id}>
                    {val.name}
                  </option>
                ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium">
          <Tag size={15} /> Tags
        </label>
        <input
          {...register("tags")}
          placeholder="fashion, cotton, clothing"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-gray-400">Separate tags with commas.</p>
      </div>
    </>
  );
};

export default ProductData;
