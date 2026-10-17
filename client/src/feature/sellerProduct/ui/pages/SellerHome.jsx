import { useState } from "react";
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  AlertTriangle,
  MoreHorizontal,
  CalendarDays,
} from "lucide-react";
import SellerNavbar from "../../../../share/NavBar/ui/pages/SellerNavbar";

const salesData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 82 },
  { day: "Fri", value: 62 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 72 },
];

const initialOrders = [
  {
    id: "#ORD-1024",
    customer: "Rahul Sharma",
    product: "Wireless Headphones",
    amount: 2499,
    status: "Delivered",
    date: "11 Oct 2026",
  },
  {
    id: "#ORD-1025",
    customer: "Priya Verma",
    product: "Smart Watch",
    amount: 3299,
    status: "Processing",
    date: "11 Oct 2026",
  },
  {
    id: "#ORD-1026",
    customer: "Aman Patel",
    product: "Running Shoes",
    amount: 1899,
    status: "Shipped",
    date: "10 Oct 2026",
  },
  {
    id: "#ORD-1027",
    customer: "Neha Singh",
    product: "Backpack",
    amount: 1299,
    status: "Pending",
    date: "10 Oct 2026",
  },
];

const topProducts = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    sold: 124,
    revenue: 309876,
    color: "bg-violet-100 text-violet-600",
    icon: "🎧",
  },
  {
    name: "Smart Watch",
    category: "Accessories",
    sold: 98,
    revenue: 293902,
    color: "bg-blue-100 text-blue-600",
    icon: "⌚",
  },
  {
    name: "Running Shoes",
    category: "Fashion",
    sold: 76,
    revenue: 144324,
    color: "bg-orange-100 text-orange-600",
    icon: "👟",
  },
];

const lowStock = [
  { name: "Wireless Mouse", stock: 4 },
  { name: "USB-C Cable", stock: 7 },
  { name: "Laptop Stand", stock: 3 },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-violet-50 text-violet-700",
  Pending: "bg-amber-50 text-amber-700",
};

const SellerHome = () => {
  const [period, setPeriod] = useState("7 days");
  const [orders, setOrders] = useState(initialOrders);

  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,24,500",
      change: "+12.8%",
      positive: true,
      icon: IndianRupee,
      iconBg: "bg-orange-50 text-orange-600",
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.2%",
      positive: true,
      icon: ShoppingBag,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Products",
      value: "156",
      change: "+4.5%",
      positive: true,
      icon: Package,
      iconBg: "bg-violet-50 text-violet-600",
    },
    {
      title: "Total Customers",
      value: "892",
      change: "-2.1%",
      positive: false,
      icon: Users,
      iconBg: "bg-green-50 text-green-600",
    },
  ];

  const updateStatus = (id, status) => {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-800">
      <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Seller Panel / Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-gray-50"
          >
            <CalendarDays size={17} />
            Export / Print
          </button>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const ChangeIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight">
                      {stat.value}
                    </h2>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.iconBg}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      stat.positive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    <ChangeIcon size={15} />
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Chart and order summary */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Sales chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Sales Overview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Revenue performance over time
                </p>
              </div>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
              >
                <option>7 days</option>
                <option>30 days</option>
                <option>90 days</option>
              </select>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total sales</p>
                  <p className="mt-1 text-3xl font-bold">₹84,250</p>
                </div>
                <span className="mb-1 flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                  <TrendingUp size={14} />
                  18.6%
                </span>
              </div>

              {/* CSS-based chart; no chart library needed */}
              <div className="mt-8 flex h-48 items-end justify-between gap-2 sm:gap-4">
                {salesData.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="flex h-full w-full items-end justify-center">
                      <div
                        title={`${item.value}%`}
                        className={`w-full max-w-12 rounded-t-lg transition-all duration-300 ${
                          item.day === "Sat"
                            ? "bg-orange-500"
                            : "bg-orange-100 hover:bg-orange-300"
                        }`}
                        style={{ height: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Order Summary</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Current order status
                </p>
              </div>
              <MoreHorizontal className="text-gray-400" size={22} />
            </div>

            <div className="mt-6 space-y-5">
              {[
                {
                  label: "Pending",
                  count: 18,
                  color: "bg-amber-400",
                  icon: Clock,
                },
                {
                  label: "Processing",
                  count: 32,
                  color: "bg-blue-500",
                  icon: Package,
                },
                {
                  label: "Shipped",
                  count: 45,
                  color: "bg-violet-500",
                  icon: Truck,
                },
                {
                  label: "Delivered",
                  count: 86,
                  color: "bg-green-500",
                  icon: CheckCircle,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon size={16} />
                        {item.label}
                      </span>
                      <span className="text-sm font-bold">{item.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{
                          width: `${(item.count / 181) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 rounded-xl bg-orange-50 p-3 text-xs leading-5 text-orange-700">
              Keep an eye on pending orders to ensure timely delivery.
            </p>
          </div>
        </section>

        {/* Recent orders */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-bold">Recent Orders</h2>
              <p className="mt-1 text-sm text-gray-500">
                Track your latest customer orders
              </p>
            </div>

            <a
              href="/seller/orders"
              className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              View all <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Update</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-orange-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {order.customer}
                      <p className="mt-1 text-xs text-gray-400">{order.date}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{order.product}</td>
                    <td className="px-6 py-4 font-semibold">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        aria-label={`Update ${order.id} status`}
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs outline-none focus:border-orange-400"
                      >
                        {Object.keys(statusStyles).map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Products and low stock */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Top Selling Products</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Your best-performing products
                </p>
              </div>
              <a
                href="/seller/products"
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                View all
              </a>
            </div>

            <div className="mt-5 space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 sm:gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                    {product.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {product.category} · {product.sold} sold
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold">
                      {formatCurrency(product.revenue)}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      #{index + 1} product
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low stock alert */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Low Stock Alert</h2>
                <p className="text-sm text-gray-500">
                  Products that need restocking
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {lowStock.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Remaining stock
                    </p>
                  </div>

                  <span className="shrink-0 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600">
                    {product.stock} left
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/seller/products"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Manage Inventory <Eye size={16} />
            </a>
          </div>
        </section>

        <p className="pb-2 text-center text-xs text-gray-400">
          ShopKart Seller Dashboard · Demo data
        </p>
      </main>
    </div>
  );
};

export default SellerHome;
