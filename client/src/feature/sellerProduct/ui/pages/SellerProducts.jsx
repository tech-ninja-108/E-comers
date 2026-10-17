import {
  Search,
  Plus,
  Package,
  Filter,
  ToggleLeft,
  ShoppingBag,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";
import AllProduct from "../components/AllProduct";
import { useState } from "react";
import AddyaDelete from "../components/AddyaDelete";
import { sellerProduct } from "../../hooks/SellerQury";

const SellerProducts = () => {
  const inputClass =
    "rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-400";
  const { data, isPending } = sellerProduct();
  const [productId, setProductId] = useState(null);
  const [toggleCard, settoggleCard] = useState(false);
  const [productData, setProductData] = useState([]);

  const activeCount =
    data?.filter((product) => product.isActive === true).length || 0;

  const inactiveCount =
    data?.filter((product) => product.isActive === false).length || 0;

  const totalAmount =
    data?.reduce((total, product) => {
      return total + (Number(product.variants?.[0]?.price) || 0);
    }, 0) || 0;

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-800">
      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">Seller Panel / Products</p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Product Management
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your catalogue, inventory and product visibility.
            </p>
          </div>

          <button
            onClick={() => settoggleCard(!toggleCard)}
            className="flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={19} />
            Add Product
          </button>
        </div>
        {toggleCard ? (
          <AddyaDelete
            settoggleCard={settoggleCard}
            toggleCard={toggleCard}
            productData={productData}
            setProductId={setProductId}
            productId={productId}
          />
        ) : (
          ""
        )}
        {/* Summary Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h2 className="mt-2 text-2xl font-bold">
                {isPending
                  ? "Loading.."
                  : data?.length > 0
                    ? data?.length
                    : "0"}
              </h2>
            </div>
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Package size={23} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Active Products</p>
              <h2 className="mt-2 text-2xl font-bold">{activeCount}</h2>
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <ShoppingBag size={23} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Inactive Products</p>
              <h2 className="mt-2 text-2xl font-bold">{inactiveCount}</h2>
            </div>
            <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
              <ToggleLeft size={23} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Inventory Value</p>
              <h2 className="mt-2 text-2xl font-bold">₹{totalAmount}</h2>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <IndianRupee size={23} />
            </div>
          </div>
        </section>

        {/* Stock Warning */}
        <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle size={20} />
          Some products have low stock. Review your inventory.
        </div>

        {/* Search and Filters */}
        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                placeholder="Search products, brands or categories..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-orange-400"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2">
                <Filter size={17} className="text-gray-400" />

                <select className={inputClass}>
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home</option>
                  <option>Beauty</option>
                </select>
              </div>

              <select className={inputClass}>
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </section>

        {/* Products Table */}
        <AllProduct
          data={data}
          isPending={isPending}
          settoggleCard={settoggleCard}
          toggleCard={toggleCard}
          setProductData={setProductData}
          setProductId={setProductId}
          productId={productId}
        />
      </main>
    </div>
  );
};

export default SellerProducts;
