import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
} from "lucide-react";
import Navbar from "../../../../share/NavBar/ui/pages/NavBar";
import Products from "../components/Products";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 2499,
    rating: 4.8,
    discount: "40% OFF",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Classic Sneakers",
    category: "Fashion",
    price: 1999,
    oldPrice: 2999,
    rating: 4.6,
    discount: "33% OFF",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    oldPrice: 3999,
    rating: 4.7,
    discount: "37% OFF",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Travel Backpack",
    category: "Fashion",
    price: 899,
    oldPrice: 1499,
    rating: 4.5,
    discount: "40% OFF",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "Modern Table Lamp",
    category: "Home & Kitchen",
    price: 799,
    oldPrice: 1199,
    rating: 4.4,
    discount: "33% OFF",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    name: "Premium Sunglasses",
    category: "Fashion",
    price: 599,
    oldPrice: 999,
    rating: 4.3,
    discount: "40% OFF",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    name: "Digital Camera",
    category: "Electronics",
    price: 8999,
    oldPrice: 10999,
    rating: 4.8,
    discount: "18% OFF",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    name: "Minimal Wrist Watch",
    category: "Fashion",
    price: 1299,
    oldPrice: 1999,
    rating: 4.6,
    discount: "35% OFF",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
  },
];

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80",
  },
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const addToCart = (product) => {
    // console.log(product);

    setCart((previous) => [...previous, product._id]);
  };

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      {/* Hero */}
      <section className="bg-orange-50">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div>
            <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700">
              New season collection
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Shop Your
              <br />
              <span className="text-orange-600">Style, Your Way.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              Discover the latest trends, everyday essentials and amazing deals
              — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700"
              >
                Shop Now <ArrowRight size={19} />
              </a>

              <a
                href="#categories"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold transition hover:border-orange-500 hover:text-orange-600"
              >
                Explore Categories
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-6 text-sm text-gray-600">
              <span>✓ Quality products</span>
              <span>✓ Secure checkout</span>
              <span>✓ Easy returns</span>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
              alt="Modern fashion shopping store"
              className="h-72 w-full rounded-3xl object-cover shadow-xl sm:h-96"
            />

            <div className="absolute -bottom-4 left-4 rounded-2xl bg-white p-4 shadow-lg sm:bottom-6 sm:left-6">
              <p className="text-sm text-gray-500">Exclusive deals</p>
              <p className="text-2xl font-extrabold text-orange-600">
                Up to 50% OFF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          {
            icon: Truck,
            title: "Free Delivery",
            desc: "On eligible orders",
          },
          {
            icon: ShieldCheck,
            title: "Secure Payment",
            desc: "Protected checkout",
          },
          {
            icon: RotateCcw,
            title: "Easy Returns",
            desc: "Hassle-free process",
          },
          {
            icon: Headphones,
            title: "Customer Support",
            desc: "Here to help",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4"
          >
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <item.icon size={23} />
            </div>
            <div>
              <h3 className="text-sm font-bold">{item.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-orange-600">
                Browse collections
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Shop by Category
              </h2>
            </div>

            <Link
              to="/products"
              className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              View all <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-100"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-40 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-56"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-base font-bold text-white sm:text-xl">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <Products
        cart={cart}
        setActiveCategory={setActiveCategory}
        wishlist={wishlist}
        filteredProducts={filteredProducts}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
      />

      {/* Promotional banner */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gray-900 px-6 py-10 text-white sm:px-12 sm:py-14">
          <div className="max-w-xl">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-400">
              Limited time offer
            </span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Upgrade your everyday essentials.
            </h2>
            <p className="mt-4 leading-7 text-gray-300">
              Find products you love at prices you will love even more.
            </p>
            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold transition hover:bg-orange-700"
            >
              Explore Deals <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-gray-100 bg-orange-50 px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold">Get offers in your inbox</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign up for updates on new arrivals and special deals.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter signup needs a backend API.");
            }}
            className="mx-auto mt-6 flex max-w-lg gap-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-700 sm:px-6"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 px-4 py-10 text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-2xl font-extrabold">
              <span className="text-white">Shop</span>
              <span className="text-orange-500">Kart</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
              Your everyday shopping destination for quality products at
              affordable prices.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-orange-400">
                Home
              </Link>
              <Link to="/products" className="hover:text-orange-400">
                Products
              </Link>
              <Link to="/cart" className="hover:text-orange-400">
                Shopping Cart
              </Link>
              <Link to="/login" className="hover:text-orange-400">
                My Account
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Customer Service</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/orders" className="hover:text-orange-400">
                Track Orders
              </Link>
              <Link to="/returns" className="hover:text-orange-400">
                Returns & Refunds
              </Link>
              <Link to="/help" className="hover:text-orange-400">
                Help Center
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Shop with confidence</h3>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Secure payments, transparent pricing and customer support for your
              shopping experience.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ShopKart. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Home;
