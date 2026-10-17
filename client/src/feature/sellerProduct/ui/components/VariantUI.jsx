import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const VariantUI = ({ varient, varients, setVarient, setVarients }) => {
  const inputClass =
    "w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-orange-400";

  const varientHandal = () => {
    if (
      !varient.color.trim() ||
      !varient.size ||
      !varient.mrp ||
      !varient.price ||
      !varient.stock
    ) {
      toast.info("Please fill all details");
      return;
    }
    if (Number(varient.mrp) <= 0 || Number(varient.price) <= 0) {
      toast.info("Price must be greater than 0");
      return;
    }
    if (Number(varient.stock) < 0) {
      toast.info("Stock cannot be negative");
      return;
    }
    if (Number(varient.mrp) < Number(varient.price)) {
      toast.info("Selling price cannot be greater than MRP");
      return;
    }
    setVarients((prv) => [...prv, varient]);
    setVarient({
      color: "",
      size: "",
      mrp: "",
      price: "",
      stock: "",
    });
  };

  return (
    <div className="space-y-4">
      {/* Added Variant UI */}
      {varients?.length > 0
        ? varients.map((vars, index) => (
            <div
              key={index}
              className="rounded-2xl border border-green-200 bg-green-50 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                  Variant {index + 1}
                </h3>

                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-600">
                {vars.color}/{vars.size}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <p>MRP: ₹{vars.mrp}</p>
                <p>Price: ₹{vars.price}</p>
                <p>Stock: {vars.stock}</p>
              </div>
            </div>
          ))
        : ""}

      {/* Current Variant Form */}
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Variant {varients?.length + 1}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add color, size and pricing details
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Color</label>

          <input
            onChange={(e) =>
              setVarient((prv) => ({ ...prv, color: e.target.value }))
            }
            value={varient?.color}
            placeholder="e.g. Black"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Size</label>

          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                onClick={() => {
                  setVarient((prv) => ({ ...prv, size: size }));
                }}
                value={varient?.size}
                type="button"
                key={size}
                className={`rounded-lg cursor-pointer border px-4 py-2 text-sm transition-all duration-200 ${
                  varient?.size === size
                    ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-300 ring-2 ring-orange-200"
                    : "border-gray-200 bg-white text-gray-700 hover:border-orange-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">MRP (₹)</label>

            <input
              onChange={(e) =>
                setVarient((prv) => ({ ...prv, mrp: e.target.value }))
              }
              value={varient?.mrp}
              type="number"
              placeholder="Enter MRP"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Selling Price (₹)
            </label>

            <input
              onChange={(e) =>
                setVarient((prv) => ({ ...prv, price: e.target.value }))
              }
              value={varient?.price}
              type="number"
              placeholder="Enter price"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Stock Quantity
            </label>

            <input
              onChange={(e) =>
                setVarient((prv) => ({ ...prv, stock: e.target.value }))
              }
              value={varient?.stock}
              type="number"
              placeholder="Enter stock quantity"
              className={inputClass}
            />
          </div>
        </div>

        <button
          onClick={varientHandal}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 cursor-pointer"
        >
          <Plus size={18} />
          Add Variant
        </button>
      </div>
    </div>
  );
};

export default VariantUI;
