import {
  ChevronDown,
  Heart,
  Menu,
  Package,
  Search,
  ShoppingCart,
  UserRound,
  X,
  Settings,
  LogOut,
  CircleUserRound,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

const MainNabar = ({
  search,
  setSearch,
  menuOpen,
  setMenuOpen,
  LogoutHandle,
}) => {
  const navigate = useNavigate();

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
      {/* Mobile Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      {/* Logo */}
      <NavLink to="/" className="shrink-0 text-2xl font-extrabold">
        <span className="text-gray-900">Shop</span>
        <span className="text-orange-600">Kart</span>
      </NavLink>

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search.trim())}`);
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
        {/* Account Dropdown */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            type="button"
            aria-expanded={accountOpen}
            className="hidden items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 sm:flex"
          >
            <UserRound size={21} />
            <span>Account</span>

            <ChevronDown
              size={15}
              className={`transition-transform ${
                accountOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {accountOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="font-semibold text-gray-900">My Account</p>

                <p className="text-xs text-gray-500">Manage your account</p>
              </div>

              <NavLink
                to="/profile"
                onClick={() => setAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <CircleUserRound size={18} />
                My Profile
              </NavLink>

              <NavLink
                to="/orders"
                onClick={() => setAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <Package size={18} />
                My Orders
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={() => setAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <Heart size={18} />
                My Wishlist
              </NavLink>

              <NavLink
                to="/settings"
                onClick={() => setAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <Settings size={18} />
                Settings
              </NavLink>

              <div className="my-2 border-t border-gray-100" />

              <button
                onClick={() => LogoutHandle()}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Wishlist */}
        <NavLink
          to="/wishlist"
          className="hidden text-gray-700 hover:text-orange-600 sm:block"
          aria-label="Wishlist"
        >
          <Heart size={23} />
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className="hidden text-gray-700 hover:text-orange-600 sm:block"
          aria-label="Orders"
        >
          <Package size={23} />
        </NavLink>

        {/* Cart */}
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
