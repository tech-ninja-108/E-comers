import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import MainNabar from "../components/buyer/MainNabar";
import { Search } from "lucide-react";
import { UserLogoutQurey } from "../../hooks/userQuery";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../../feature/Auth/state/user.auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { mutateAsync: logout, isPending } = UserLogoutQurey();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = [
    "All Products",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports",
  ];

  const LogoutHandle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want Logout?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes, change it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (isPending) {
            return;
          }
          const res = await logout();
          dispatch(userLogout());
          sessionStorage.removeItem("accessToken");
          navigate("/login");
          toast.success(res.data.message);
        } catch (e) {
          toast.error("Logout faill");
          console.log(e);
        }
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top offer bar */}
      <div className="bg-orange-600 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        🎉 Special Sale! Get up to 50% OFF on selected products
      </div>

      {/* Main navbar */}
      <MainNabar
        search={search}
        setSearch={setSearch}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        LogoutHandle={LogoutHandle}
      />

      {/* Mobile search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(search.trim())}`;
          }
        }}
        className="px-4 pb-3 md:hidden"
      >
        <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-orange-600 px-4 text-white"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* Categories */}
      <nav className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-3">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={
                category === "All Products"
                  ? "/products"
                  : `/products?category=${encodeURIComponent(category)}`
              }
              className="whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-orange-600"
            >
              {category}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <NavLink
                key={category}
                to={
                  category === "All Products"
                    ? "/products"
                    : `/products?category=${encodeURIComponent(category)}`
                }
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                {category}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50"
            >
              My Account
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
