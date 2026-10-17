import { useEffect } from "react";
import {
  DeleteProduct,
  GetUpadateProductQurey,
  UpdateStatus,
} from "../../hooks/SellerQury";
import ProductLoading from "./ProductLoading";
import Swal from "sweetalert2";
const AllProduct = ({
  data,
  isPending,
  settoggleCard,
  setProductData,
  setProductId,
  productId,
}) => {
  const { mutate: updateStatus, isPending: pending } = UpdateStatus();
  const { mutate: deletes } = DeleteProduct();
  const { data: productData } = GetUpadateProductQurey(productId);

  const statusUpdateHandale = ({ id, status }) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${status ? "Deactive" : "Active"} this product?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes, change it",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(id);
      }
    });
  };

  useEffect(() => {
    if (productData) {
      setProductData(productData);
    }
  }, [productData]);

  // console.log(productData);

  const ProductUpdateHandal = ({ id }) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to Edit this product?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes, change it",
    }).then((result) => {
      if (result.isConfirmed) {
        settoggleCard(true);
        setProductId(id);
      }
    });
  };

  const ProductDeleteHandal = ({ id }) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to Delete this product?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deletes(id);
      }
    });
  };
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {isPending ? (
              <ProductLoading />
            ) : data?.length > 0 ? (
              data.map((product) => {
                return (
                  <tr key={product._id}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 overflow-hidden">
                          {/* <Package size={22} /> */}
                          <img src={product.images[0].url} alt="" />
                        </div>
                        <div>
                          <p className="font-semibold">{product.title}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">{product.category.name}</td>
                    <td className="px-6 py-5 font-semibold">
                      ₹{product.variants[0].price}
                    </td>
                    <td className="px-6 py-5">{product.variants[0].stock}</td>

                    <td
                      onClick={() =>
                        statusUpdateHandale({
                          id: product._id,
                          status: product.isActive,
                        })
                      }
                      className="px-6 py-5"
                    >
                      <button
                        disabled={pending}
                        className={
                          product.isActive
                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 cursor-pointer"
                            : "rounded-full bg-green-200 px-3 py-1 text-xs font-medium text-red-700 cursor-pointer"
                        }
                      >
                        {product.isActive ? "Active" : "Deactive"}
                      </button>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-3 text-sm font-medium">
                        <button
                          onClick={() =>
                            ProductUpdateHandal({ id: product._id })
                          }
                          className="text-blue-600 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            ProductDeleteHandal({ id: product._id })
                          }
                          className="text-red-500 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <ProductLoading />
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllProduct;
