import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  MapPin,
  ChevronRight,
  Share2,
  Headphones,
  Package,
  CircleCheck,
  Clock,
} from "lucide-react";
import Reviews from "../components/Reviews";
import { getSingleProduct } from "../../hooks/useQueryGetProduct";
import Loading from "../../../../share/NavBar/ui/pages/Loading";

const productImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85",
];

const relatedProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 2499,
    rating: 4.8,
    reviews: 124,
    discount: "40% OFF",
    image: productImages[0],
  },
  {
    id: 2,
    name: "Studio Over-Ear Headphones",
    category: "Electronics",
    price: 1899,
    oldPrice: 2999,
    rating: 4.6,
    reviews: 89,
    discount: "37% OFF",
    image: productImages[1],
  },
  {
    id: 3,
    name: "Wireless Bluetooth Headset",
    category: "Electronics",
    price: 999,
    oldPrice: 1599,
    rating: 4.5,
    reviews: 76,
    discount: "38% OFF",
    image: productImages[2],
  },
  {
    id: 4,
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 2299,
    oldPrice: 3499,
    rating: 4.7,
    reviews: 156,
    discount: "34% OFF",
    image: productImages[3],
  },
];

const reviews = [
  {
    name: "Rahul Sharma",
    date: "12 September 2026",
    rating: 5,
    title: "Excellent sound quality!",
    text: "The sound quality is amazing for this price. Comfortable to wear for long hours and the battery backup is impressive.",
    avatar: "R",
    color: "bg-blue-100 text-blue-700",
    verified: true,
    helpful: 24,
  },
  {
    name: "Priya Verma",
    date: "8 September 2026",
    rating: 4,
    title: "Good product, worth the price",
    text: "Nice design and clear audio. The fit is comfortable. Packaging was good and the product looks premium.",
    avatar: "P",
    color: "bg-pink-100 text-pink-700",
    verified: true,
    helpful: 18,
  },
  {
    name: "Aman Patel",
    date: "3 September 2026",
    rating: 5,
    title: "Better than expected",
    text: "Very good bass and connectivity. I use these for music and online classes. Happy with my purchase.",
    avatar: "A",
    color: "bg-green-100 text-green-700",
    verified: true,
    helpful: 12,
  },
];

const specifications = [
  ["Brand", "ShopKart Audio"],
  ["Product Type", "Wireless Headphones"],
  ["Connectivity", "Bluetooth"],
  ["Battery Life", "Up to 30 hours"],
  ["Charging", "USB Type-C"],
  ["Microphone", "Built-in microphone"],
  ["Colour", "Black"],
  ["Warranty", "1 year manufacturer warranty"],
];

const RatingStars = ({ rating = 5, size = 16 }) => (
  <div className="flex items-center gap-0.5 text-amber-400">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        fill={star <= rating ? "currentColor" : "none"}
        strokeWidth={1.8}
      />
    ))}
  </div>
);

const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [activeTab, setActiveTab] = useState("Description");
  const [liked, setLiked] = useState(false);

  const { id } = useParams();
  const { data, isPending, isError, error } = getSingleProduct(id);
  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  console.log(data);

  const availableSizes = data.variants
    .filter((item) => item.color === selectedColor)
    .map((item) => item.size);

  const selectedVariant = data.variants.find(
    (item) => item.color === selectedColor && item.size === selectedSize,
  );
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Top navigation */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/home"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck size={17} className="text-green-600" />
            Secure Shopping
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
          <Link to="/home" className="hover:text-orange-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-orange-600">
            Products
          </Link>
          <ChevronRight size={14} />
          <Link
            to="/products?category=Electronics"
            className="hover:text-orange-600"
          >
            Electronics
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-900">{data.title}</span>
        </div>
      </div>

      {/* Product details */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Image gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-orange-50">
              <img
                src={data.images[selectedImage].url}
                alt={data.title}
                className="h-[350px] w-full object-contain p-6 sm:h-[500px] sm:p-10"
              />

              <span className="absolute left-4 top-4 rounded-lg bg-orange-600 px-3 py-2 text-xs font-bold text-white">
                {selectedVariant?.discountPercentage}
              </span>

              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-600">
                Image {selectedImage + 1} of {data.images.length}
              </span>

              <button
                type="button"
                aria-label="Share product"
                className="absolute right-4 top-4 rounded-full bg-white p-3 text-gray-700 shadow-sm hover:text-orange-600"
              >
                <Share2 size={19} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {data.images.map((image, index) => (
                <button
                  type="button"
                  key={image._id}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-xl border-2 bg-orange-50 transition ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Product view ${index + 1}`}
                    className="h-20 w-full object-contain p-2 sm:h-28"
                  />
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-100 p-3 text-center">
                <Truck className="mx-auto text-orange-600" size={22} />
                <p className="mt-2 text-xs font-semibold">Fast Delivery</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-3 text-center">
                <ShieldCheck className="mx-auto text-orange-600" size={22} />
                <p className="mt-2 text-xs font-semibold">Secure Payment</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-3 text-center">
                <RotateCcw className="mx-auto text-orange-600" size={22} />
                <p className="mt-2 text-xs font-semibold">Easy Returns</p>
              </div>
            </div>
          </div>

          {/* Product information */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-700">
                {data.category.name}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
                <CircleCheck size={17} />
                {data.variants[0].stock}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              {data.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Brand:{" "}
              <span className="font-semibold text-gray-800">{data.brand}</span>
              <span className="mx-2 text-gray-300">|</span>
              SKU: {data?.sku}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <RatingStars rating={5} size={17} />
              <span className="font-bold">{data.rating}/5</span>
              <a
                href="#reviews"
                className="text-sm text-orange-600 hover:underline"
              >
                {data.reviews.length} customer reviews
              </a>
            </div>

            <div className="mt-6 border-y border-gray-100 py-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-4xl font-extrabold tracking-tight">
                  ₹{data.variants[0].price.toLocaleString("en-IN")}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{data.variants[0].mrp.toLocaleString("en-IN")}
                </span>
                <span className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                  Save ₹
                  {(
                    data.variants[0].mrp - data.variants[0].price
                  ).toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-2 text-sm text-green-700">
                Inclusive of all applicable taxes
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Final price and availability may vary.
              </p>
            </div>

            <p className="mt-5 leading-7 text-gray-600">{data.description}</p>

            {/* Colour selection */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold">Colour:</span>
                <span className="text-gray-500">{selectedColor}</span>
              </div>

              <div className="mt-3 flex gap-3">
                {data.variants.map((item) => (
                  <button
                    type="button"
                    key={item.color}
                    onClick={() => {
                      setSelectedColor(item.color);
                      setSelectedSize("");
                    }}
                    aria-label={item.color}
                    className={`flex items-center gap-2 rounded-xl border  px-3 py-2 text-sm ${
                      selectedColor === item.color
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span
                      className={`h-5 w-5 rounded-full border border-black/10 ${item.color}`}
                      style={{ backgroundColor: item.color }}
                    />
                    {item.color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mt-6">
              <p className="text-sm font-bold">Size / Fit</p>
              <div className="mt-3 flex gap-3">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    disabled={!availableSizes.includes(size)}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-xl border px-4 py-2 ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    } disabled:cursor-not-allowed disabled:opacity-30`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and actions */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-600 hover:text-orange-600"
                  aria-label="Decrease quantity"
                >
                  <Minus size={17} />
                </button>
                <span className="min-w-10 text-center font-bold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-600 hover:text-orange-600"
                  aria-label="Increase quantity"
                >
                  <Plus size={17} />
                </button>
              </div>

              <span className="text-sm text-gray-500">
                Subtotal:{" "}
                <strong className="text-gray-900">
                  ₹{(data.variants[0].price * quantity).toLocaleString("en-IN")}
                </strong>
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                type="button"
                className="rounded-xl border border-gray-300 px-5 py-4 font-bold text-gray-900 transition hover:border-orange-500 hover:text-orange-600"
              >
                Buy Now
              </button>
            </div>

            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={`mt-4 flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold ${
                liked
                  ? "border-orange-200 bg-orange-50 text-orange-600"
                  : "border-gray-200 text-gray-600 hover:text-orange-600"
              }`}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
              {liked ? "Added to Wishlist" : "Add to Wishlist"}
            </button>

            {/* Delivery information */}
            <div className="mt-7 rounded-2xl border border-gray-100 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <MapPin className="shrink-0 text-orange-600" size={22} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">
                    Check delivery availability
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Delivery estimates depend on your location.
                  </p>
                </div>
                <span className="text-sm font-semibold text-orange-600">
                  Check
                </span>
              </div>
              <div className="my-4 border-t border-gray-100" />
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Package className="shrink-0 text-gray-500" size={20} />
                  <div>
                    <p className="text-sm font-semibold">
                      Delivery and packaging
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Estimated delivery dates are shown during checkout.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCcw className="shrink-0 text-gray-500" size={20} />
                  <div>
                    <p className="text-sm font-semibold">Return policy</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Return eligibility depends on the product and seller
                      policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product information tabs - UI only */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex gap-6 overflow-x-auto">
            {["Description", "Specifications", "Shipping & Returns"].map(
              (tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 pb-4 text-sm font-bold transition ${
                    activeTab === tab
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="py-7">
          {activeTab === "Description" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-extrabold">Product Description</h2>
              <p className="mt-4 leading-8 text-gray-600">
                Enjoy your favourite music, podcasts and calls with a
                comfortable wireless listening experience. The product features
                a modern design, convenient controls and versatile everyday use.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Premium audio",
                    "Enjoy detailed sound for everyday listening.",
                  ],
                  [
                    "Comfortable design",
                    "Designed for extended listening sessions.",
                  ],
                  [
                    "Wireless convenience",
                    "Enjoy cable-free listening with compatible devices.",
                  ],
                  [
                    "Everyday use",
                    "Suitable for music, calls and entertainment.",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="flex gap-3 rounded-xl bg-gray-50 p-4"
                  >
                    <Check className="shrink-0 text-green-600" size={20} />
                    <div>
                      <h3 className="font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Specifications" && (
            <div className="max-w-3xl">
              <h2 className="mb-5 text-xl font-extrabold">
                Technical Specifications
              </h2>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                {specifications.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`grid grid-cols-2 gap-4 px-4 py-4 text-sm ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Shipping & Returns" && (
            <div className="max-w-3xl space-y-5">
              <div className="flex gap-4 rounded-xl bg-gray-50 p-5">
                <Truck className="shrink-0 text-orange-600" size={24} />
                <div>
                  <h3 className="font-bold">Shipping information</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Shipping options and estimated delivery dates are displayed
                    at checkout based on the delivery address.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl bg-gray-50 p-5">
                <RotateCcw className="shrink-0 text-orange-600" size={24} />
                <div>
                  <h3 className="font-bold">Returns and refunds</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Return windows, refund timing and product eligibility depend
                    on the applicable seller policy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <Reviews RatingStars={RatingStars} product={data} reviews={reviews} />

      {/* Related products */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              You may also like
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Similar Products
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              More products from the {data?.category.name} category
            </p>
          </div>
          <Link
            to="/products?category=Electronics"
            className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            View All <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden bg-orange-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-contain p-3 transition duration-500 group-hover:scale-105 sm:h-56 sm:p-5"
                />
                <span className="absolute left-2 top-2 rounded-md bg-orange-600 px-2 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
                  {item.discount}
                </span>
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute right-2 top-2 rounded-full bg-white p-2 text-gray-500 shadow-sm hover:text-orange-600 sm:right-3 sm:top-3"
                >
                  <Heart size={17} />
                </button>
              </div>

              <div className="p-3 sm:p-4">
                <p className="text-xs text-gray-500">{item.category.name}</p>
                <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold sm:text-base">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-amber-400"
                  />
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-gray-400">({item.reviews})</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-base font-extrabold">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{item.oldPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 px-3 py-3 text-xs font-bold text-orange-700 transition hover:bg-orange-600 hover:text-white sm:text-sm"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recently viewed */}
      <section className="border-t border-gray-100 bg-orange-50 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Clock size={23} className="text-orange-600" />
            <div>
              <h2 className="font-extrabold">Recently Viewed Products</h2>
              <p className="mt-1 text-sm text-gray-500">
                Keep exploring products you have viewed.
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            Browse Products <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Footer benefits */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          {
            icon: Truck,
            title: "Free Delivery",
            desc: "On eligible orders",
          },
          {
            icon: ShieldCheck,
            title: "Secure Payments",
            desc: "Protected checkout",
          },
          {
            icon: RotateCcw,
            title: "Easy Returns",
            desc: "Policy-based returns",
          },
          {
            icon: Headphones,
            title: "Customer Support",
            desc: "We're here to help",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4"
          >
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <item.icon size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold">{item.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default SingleProduct;
