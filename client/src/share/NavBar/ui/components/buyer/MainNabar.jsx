import {
  ChevronDown,
  Heart,
  Menu,
  Package,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router";

const MainNabar = ({ search, setSearch, menuOpen, setMenuOpen }) => {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      <NavLink to="/" className="shrink-0 text-2xl font-extrabold">
        <span className="text-gray-900">Shop</span>
        <span className="text-orange-600">Kart</span>
      </NavLink>

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(search.trim())}`;
          }
        }}
        className="hidden flex-1 md:flex"
      >
        <div className="flex w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-500">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full bg-transparent px-4 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-orange-600 px-5 text-white transition hover:bg-orange-700"
            aria-label="Search"
          >
            <Search size={21} />
          </button>
        </div>
      </form>

      {/* Actions */}
      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
        <NavLink
          // to="/login"
          className="hidden items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 sm:flex"
        >
          <UserRound size={21} />
          <span>Account</span>
          <ChevronDown size={15} />
        </NavLink>

        <NavLink
          to="/wishlist"
          className="hidden text-gray-700 hover:text-orange-600 sm:block"
          aria-label="Wishlist"
        >
          <Heart size={23} />
        </NavLink>

        <NavLink
          to="/orders"
          className="hidden text-gray-700 hover:text-orange-600 sm:block"
          aria-label="Orders"
        >
          <Package size={23} />
        </NavLink>

        <NavLink
          to="/cart"
          className="relative flex items-center gap-1 text-gray-700 hover:text-orange-600"
          aria-label="Shopping cart"
        >
          <ShoppingCart size={24} />
          <span className="hidden text-sm font-medium sm:inline">Cart</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MainNabar;
