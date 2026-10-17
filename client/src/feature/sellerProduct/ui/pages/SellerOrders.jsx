import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  IndianRupee,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
  X,
  Package,
  MapPin,
  CalendarDays,
  Phone,
  User,
  CreditCard,
  Filter,
  ArrowUpRight,
} from "lucide-react";

const initialOrders = [
  {
    id: "ORD-1024",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    product: "Wireless Headphones",
    sku: "SHK-1001",
    quantity: 2,
    amount: 4998,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Delivered",
    date: "2026-10-11",
    address: "MP Nagar, Bhopal, Madhya Pradesh",
  },
  {
    id: "ORD-1025",
    customer: "Priya Verma",
    email: "priya@example.com",
    phone: "9876543211",
    product: "Smart Watch",
    sku: "SHK-1002",
    quantity: 1,
    amount: 3299,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Processing",
    date: "2026-10-11",
    address: "Arera Colony, Bhopal, Madhya Pradesh",
  },
  {
    id: "ORD-1026",
    customer: "Aman Patel",
    email: "aman@example.com",
    phone: "9876543212",
    product: "Running Shoes",
    sku: "SHK-1003",
    quantity: 1,
    amount: 1899,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Shipped",
    date: "2026-10-10",
    address: "Kolar Road, Bhopal, Madhya Pradesh",
  },
  {
    id: "ORD-1027",
    customer: "Neha Singh",
    email: "neha@example.com",
    phone: "9876543213",
    product: "Travel Backpack",
    sku: "SHK-1004",
    quantity: 2,
    amount: 2598,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Pending",
    date: "2026-10-10",
    address: "Hoshangabad Road, Bhopal, Madhya Pradesh",
  },
  {
    id: "ORD-1028",
    customer: "Vikas Jain",
    email: "vikas@example.com",
    phone: "9876543214",
    product: "Coffee Mug",
    sku: "SHK-1006",
    quantity: 3,
    amount: 1197,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Cancelled",
    date: "2026-10-09",
    address: "Shahpura, Bhopal, Madhya Pradesh",
  },
  {
    id: "ORD-1029",
    customer: "Anjali Gupta",
    email: "anjali@example.com",
    phone: "9876543215",
    product: "Wireless Mouse",
    sku: "SHK-1005",
    quantity: 1,
    amount: 799,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Delivered",
    date: "2026-10-08",
    address: "TT Nagar, Bhopal, Madhya Pradesh",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const orderStatusStyles = {
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-violet-50 text-violet-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

const paymentStatusStyles = {
  Paid: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Refunded: "bg-gray-100 text-gray-600",
};

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const SellerOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || order.paymentStatus === paymentFilter;

      const orderDate = new Date(`${order.date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const daysAgo = Math.floor(
        (today.getTime() - orderDate.getTime()) / 86400000,
      );

      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Today" && daysAgo === 0) ||
        (dateFilter === "7 days" && daysAgo >= 0 && daysAgo < 7) ||
        (dateFilter === "30 days" && daysAgo >= 0 && daysAgo < 30);

      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  }, [orders, search, statusFilter, paymentFilter, dateFilter]);

  const pendingCount = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const processingCount = orders.filter(
    (order) => order.status === "Processing",
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const revenue = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.amount, 0);

  const updateOrderStatus = (id, status) => {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order)),
    );

    setSelectedOrder((current) =>
      current?.id === id ? { ...current, status } : current,
    );
  };

  const exportCSV = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Product",
      "Quantity",
      "Amount",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Date",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.product,
      order.quantity,
      order.amount,
      order.paymentMethod,
      order.paymentStatus,
      order.status,
      order.date,
    ]);

    const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shopkart-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-orange-50 text-orange-600",
      note: "All order records",
    },
    {
      title: "Pending Orders",
      value: pendingCount,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      note: "Need your attention",
    },
    {
      title: "Processing",
      value: processingCount,
      icon: Truck,
      color: "bg-blue-50 text-blue-600",
      note: "Being prepared",
    },
    {
      title: "Paid Revenue",
      value: formatCurrency(revenue),
      icon: IndianRupee,
      color: "bg-green-50 text-green-600",
      note: "From paid demo orders",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-800">
      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">Seller Panel / Orders</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Order Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Track orders, update delivery status and review payments.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm transition hover:bg-gray-50"
          >
            <ArrowUpRight size={17} />
            Export CSV
          </button>
        </div>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400">{stat.note}</p>
              </div>
            );
          })}
        </section>

        {/* Secondary overview */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <CheckCircle size={23} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivered Orders</p>
              <p className="mt-1 text-xl font-bold">{deliveredCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
              <Truck size={23} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Shipped Orders</p>
              <p className="mt-1 text-xl font-bold">
                {orders.filter((order) => order.status === "Shipped").length}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search order ID, customer or product..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm outline-none focus:border-orange-400"
                >
                  <option value="All">All Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={paymentFilter}
                onChange={(event) => setPaymentFilter(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400"
              >
                <option value="All">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Payment Pending</option>
                <option value="Refunded">Refunded</option>
              </select>

              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400"
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="7 days">Last 7 days</option>
                <option value="30 days">Last 30 days</option>
              </select>
            </div>
          </div>
        </section>

        {/* Orders table */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
            <div>
              <h2 className="font-bold">All Orders</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredOrders.length} order(s) found
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Product</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Payment</th>
                  <th className="px-5 py-4 font-semibold">Order Status</th>
                  <th className="px-5 py-4 font-semibold">Order Date</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-gray-50/80">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-orange-600">
                        #{order.id}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{order.customer}</p>
                          <p className="mt-1 text-xs text-gray-400">
                            {order.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium">{order.product}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        Qty: {order.quantity}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatCurrency(order.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                          paymentStatusStyles[order.paymentStatus] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                      <p className="mt-1 text-xs text-gray-400">
                        {order.paymentMethod}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        aria-label={`Update status for ${order.id}`}
                        value={order.status}
                        disabled={
                          order.status === "Cancelled" ||
                          order.status === "Delivered"
                        }
                        onChange={(event) =>
                          updateOrderStatus(order.id, event.target.value)
                        }
                        className={`rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ring-1 ring-inset ring-transparent focus:ring-orange-300 ${
                          orderStatusStyles[order.status]
                        } disabled:cursor-not-allowed disabled:opacity-80`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {new Date(`${order.date}T00:00:00`).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        title="View order details"
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <ShoppingBag
                        size={38}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      <p className="font-semibold">No orders found</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Search ya filters change karke try karo.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Order details modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900/50 p-4 backdrop-blur-sm">
          <div className="my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <p className="text-sm text-gray-500">Order details</p>
                <h2 className="mt-1 text-xl font-bold">#{selectedOrder.id}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5">
              {/* Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-gray-500">Current status</p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${
                      orderStatusStyles[selectedOrder.status]
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Order total</p>
                  <p className="mt-1 text-xl font-bold">
                    {formatCurrency(selectedOrder.amount)}
                  </p>
                </div>
              </div>

              {/* Customer */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-bold">
                  <User size={18} className="text-orange-500" />
                  Customer Information
                </h3>
                <div className="space-y-3 rounded-xl border border-gray-100 p-4 text-sm">
                  <p className="font-semibold">{selectedOrder.customer}</p>
                  <p className="break-all text-gray-500">
                    {selectedOrder.email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-500">
                    <Phone size={15} />
                    {selectedOrder.phone}
                  </p>
                  <p className="flex items-start gap-2 text-gray-500">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* Product */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-bold">
                  <Package size={18} className="text-orange-500" />
                  Product Information
                </h3>
                <div className="space-y-3 rounded-xl border border-gray-100 p-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Product</span>
                    <span className="text-right font-semibold">
                      {selectedOrder.product}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">SKU</span>
                    <span className="font-medium">{selectedOrder.sku}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Quantity</span>
                    <span className="font-medium">
                      {selectedOrder.quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-bold">
                  <CreditCard size={18} className="text-orange-500" />
                  Payment Information
                </h3>
                <div className="space-y-3 rounded-xl border border-gray-100 p-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Method</span>
                    <span className="font-medium">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Payment status</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        paymentStatusStyles[selectedOrder.paymentStatus]
                      }`}
                    >
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Order date</span>
                    <span className="flex items-center gap-1 font-medium">
                      <CalendarDays size={15} />
                      {new Date(
                        `${selectedOrder.date}T00:00:00`,
                      ).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status update */}
              {selectedOrder.status !== "Delivered" &&
                selectedOrder.status !== "Cancelled" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Update Order Status
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(event) =>
                        updateOrderStatus(selectedOrder.id, event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-400"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
