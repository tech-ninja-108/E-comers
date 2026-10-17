import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Wallet,
  Store,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UserLogoutQurey } from "../../hooks/userQuery";
import { userLogout } from "../../../../feature/Auth/state/user.auth";
import { store } from "../../../../app/store";

const SellerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: logout, isPending } = UserLogoutQurey();

  const { auth } = store.getState();
  const user = auth.user.data;
  console.log(user);

  const logoutHandal = async () => {
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
  };
  const navItems = [
    { name: "Dashboard", path: "/seller/home", icon: LayoutDashboard },
    { name: "Products", path: "/seller/products", icon: Package },
    { name: "Orders", path: "/seller/orders", icon: ShoppingBag },
    { name: "Payments", path: "/seller/payments", icon: Wallet },
    { name: "My Store", path: "/seller/profile", icon: Store },
    { name: "Settings", path: "/seller/settings", icon: Settings },
  ];

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
      isActive
        ? "bg-orange-50 text-orange-600"
        : "text-gray-600 hover:bg-gray-50 hover:text-orange-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      {/* Main navbar */}
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            to="/seller/home"
            className="text-2xl font-extrabold tracking-tight"
          >
            Shop<span className="text-orange-600">Kart</span>
            <span className="ml-2 hidden rounded-md bg-orange-50 px-2 py-1 align-middle text-[10px] font-bold uppercase tracking-wider text-orange-600 sm:inline-block">
              Seller
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink key={path} to={path} end className={navClass}>
              <Icon size={17} />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              className="relative rounded-xl border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-14 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Notifications</h3>
                  <button
                    onClick={() => setNotificationOpen(false)}
                    className="text-xs text-gray-500 hover:text-orange-600"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-orange-50 p-3">
                  <p className="text-sm font-semibold text-gray-800">
                    Seller notifications
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    New orders and stock alerts will appear here when connected
                    to your backend.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Seller profile */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
                S
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-bold text-gray-800">Seller Name</p>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-gray-500 sm:block"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-52 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                <Link
                  to="/seller/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Store size={17} /> My Store
                </Link>

                <Link
                  to="/seller/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings size={17} /> Settings
                </Link>

                <div className="my-1 border-t" />

                <Link
                  to="/login"
                  onClick={() => {
                    setProfileOpen(false);
                    logoutHandal();
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} /> Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white p-3 lg:hidden">
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-2 sm:grid-cols-3">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end
                onClick={() => setMenuOpen(false)}
                className={navClass}
              >
                <Icon size={18} />
                {name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default SellerNavbar;
