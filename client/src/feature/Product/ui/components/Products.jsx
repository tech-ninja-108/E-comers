import { ArrowRight, Check, Heart, ShoppingCart, Star } from "lucide-react";
import { NavLink } from "react-router";
import { useProducts } from "../../hooks/useQueryGetProduct";
import Loading from "../../../../share/NavBar/ui/pages/Loading";

const Products = ({
  activeCategory,
  addToCart,
  setActiveCategory,
  cart,
  wishlist,
  toggleWishlist,
}) => {
  const { data, isPending, isError, error } = useProducts();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  console.log(data);

  return (
    <section id="products" className="scroll-mt-40 bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              Handpicked for you
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Trending Products
            </h2>
          </div>

          <NavLink
            to="/products"
            className="flex items-center gap-1 text-sm font-semibold text-orange-600"
          >
            View all products <ArrowRight size={17} />
          </NavLink>
        </div>

        {/* Category filters */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {["All", "Electronics", "Fashion", "Home & Kitchen"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-orange-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300"
                }`}
              >
                {category}
              </button>
            ),
          )}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {data.map((product) => {
            const added = cart.includes(product.id);
            const liked = wishlist.includes(product.id);

            return (
              <article
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <NavLink to={`/products/${product._id}`}>
                    <img
                      src={product.images[0].url}
                      alt={product.brand}
                      loading="lazy"
                      className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
                    />
                  </NavLink>

                  <span className="absolute left-2 top-2 rounded-md bg-orange-600 px-2 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
                    {`${Math.round(product.variants[0].discountPercentage)}%`}
                  </span>

                  <button
                    onClick={() => toggleWishlist(product._id)}
                    aria-label="Toggle wishlist"
                    className={`absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm transition hover:text-orange-600 sm:right-3 sm:top-3 ${
                      liked ? "text-orange-600" : "text-gray-500"
                    }`}
                  >
                    <Heart size={17} fill={liked ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-xs text-gray-500">{product.category}</p>

                  <NavLink to={`/products/${product._id}`}>
                    <h3 className="mt-1 truncate text-sm font-bold hover:text-orange-600 sm:text-base">
                      {product.title}
                    </h3>
                  </NavLink>

                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-amber-400"
                    />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-400">(Reviews)</span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-base font-extrabold sm:text-lg">
                      ₹{product.variants[0].price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.variants[0].mrp.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-xs font-bold transition sm:text-sm ${
                      added
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={16} /> Added (
                        {cart.filter((id) => id === product._id).length})
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
