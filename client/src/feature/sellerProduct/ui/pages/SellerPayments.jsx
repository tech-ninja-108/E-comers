import { useMemo, useState } from "react";
import {
  IndianRupee,
  Wallet,
  TrendingUp,
  Clock,
  Search,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  CheckCircle,
  XCircle,
  CalendarDays,
  Filter,
  Banknote,
  CircleDollarSign,
  Receipt,
} from "lucide-react";

const initialTransactions = [
  {
    id: "TXN-5001",
    orderId: "ORD-1024",
    customer: "Rahul Sharma",
    description: "Wireless Headphones",
    type: "Sale",
    amount: 4998,
    fee: 100,
    netAmount: 4898,
    method: "UPI",
    status: "Completed",
    date: "2026-10-11",
  },
  {
    id: "TXN-5002",
    orderId: "ORD-1025",
    customer: "Priya Verma",
    description: "Smart Watch",
    type: "Sale",
    amount: 3299,
    fee: 66,
    netAmount: 3233,
    method: "Card",
    status: "Processing",
    date: "2026-10-11",
  },
  {
    id: "TXN-5003",
    orderId: "ORD-1026",
    customer: "Aman Patel",
    description: "Running Shoes",
    type: "Sale",
    amount: 1899,
    fee: 38,
    netAmount: 1861,
    method: "COD",
    status: "Pending",
    date: "2026-10-10",
  },
  {
    id: "TXN-5004",
    orderId: "ORD-1027",
    customer: "Neha Singh",
    description: "Travel Backpack",
    type: "Sale",
    amount: 2598,
    fee: 52,
    netAmount: 2546,
    method: "UPI",
    status: "Completed",
    date: "2026-10-10",
  },
  {
    id: "TXN-5005",
    orderId: "ORD-1028",
    customer: "Vikas Jain",
    description: "Coffee Mug",
    type: "Refund",
    amount: 1197,
    fee: 0,
    netAmount: -1197,
    method: "Card",
    status: "Refunded",
    date: "2026-10-09",
  },
  {
    id: "TXN-5006",
    orderId: "ORD-1029",
    customer: "Anjali Gupta",
    description: "Wireless Mouse",
    type: "Payout",
    amount: 2500,
    fee: 0,
    netAmount: -2500,
    method: "Bank Transfer",
    status: "Completed",
    date: "2026-10-08",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const statusStyles = {
  Completed: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
  Refunded: "bg-gray-100 text-gray-600",
};

const SellerPayments = () => {
  const [transactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const query = search.toLowerCase();

      const matchesSearch =
        transaction.id.toLowerCase().includes(query) ||
        transaction.orderId.toLowerCase().includes(query) ||
        transaction.customer.toLowerCase().includes(query) ||
        transaction.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      const matchesType =
        typeFilter === "All" || transaction.type === typeFilter;

      const transactionDate = new Date(`${transaction.date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const daysAgo = Math.floor(
        (today.getTime() - transactionDate.getTime()) / 86400000,
      );

      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Today" && daysAgo === 0) ||
        (dateFilter === "7 days" && daysAgo >= 0 && daysAgo < 7) ||
        (dateFilter === "30 days" && daysAgo >= 0 && daysAgo < 30);

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [transactions, search, statusFilter, typeFilter, dateFilter]);

  const completedSales = transactions
    .filter(
      (transaction) =>
        transaction.type === "Sale" && transaction.status === "Completed",
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const pendingAmount = transactions
    .filter(
      (transaction) =>
        transaction.type === "Sale" &&
        ["Pending", "Processing"].includes(transaction.status),
    )
    .reduce((sum, transaction) => sum + transaction.netAmount, 0);

  const totalFees = transactions
    .filter(
      (transaction) =>
        transaction.type === "Sale" && transaction.status === "Completed",
    )
    .reduce((sum, transaction) => sum + transaction.fee, 0);

  const payoutAmount = transactions
    .filter(
      (transaction) =>
        transaction.type === "Payout" && transaction.status === "Completed",
    )
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const exportCSV = () => {
    const headers = [
      "Transaction ID",
      "Order ID",
      "Customer",
      "Description",
      "Type",
      "Gross Amount",
      "Fee",
      "Net Amount",
      "Method",
      "Status",
      "Date",
    ];

    const rows = filteredTransactions.map((item) => [
      item.id,
      item.orderId,
      item.customer,
      item.description,
      item.type,
      item.amount,
      item.fee,
      item.netAmount,
      item.method,
      item.status,
      item.date,
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
    link.download = "shopkart-payments.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const summaryCards = [
    {
      title: "Completed Sales",
      value: formatCurrency(completedSales),
      description: "Gross value of completed sales",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending Payments",
      value: formatCurrency(pendingAmount),
      description: "Processing and pending sales",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Transaction Fees",
      value: formatCurrency(totalFees),
      description: "Fees on completed demo sales",
      icon: Receipt,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Completed Payouts",
      value: formatCurrency(payoutAmount),
      description: "Recorded demo payouts",
      icon: Wallet,
      color: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-800">
      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">Seller Panel / Payments</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Payments & Earnings
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Review transactions, fees and payout history.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm transition hover:bg-gray-50"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Earnings banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-sm sm:p-8">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-white/10" />

          <div className="relative grid grid-cols-1 gap-7 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-orange-50">
                <Wallet size={18} />
                Seller earnings overview
              </div>
              <p className="mt-5 text-sm text-orange-100">Completed sales</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                {formatCurrency(completedSales)}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-orange-50">
                This summary is based on the sample transactions shown below.
                Actual settlement amounts depend on your payment provider.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-orange-50">
                  <Clock size={17} />
                  Pending amount
                </div>
                <p className="mt-3 text-2xl font-bold">
                  {formatCurrency(pendingAmount)}
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-orange-50">
                  <Banknote size={17} />
                  Recorded payouts
                </div>
                <p className="mt-3 text-2xl font-bold">
                  {formatCurrency(payoutAmount)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">{card.title}</p>
                    <p className="mt-3 text-2xl font-bold">{card.value}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${card.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400">{card.description}</p>
              </div>
            );
          })}
        </section>

        {/* Payment methods info */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              name: "UPI Payments",
              description: "Transactions recorded through UPI",
              icon: ArrowDownLeft,
              color: "bg-green-50 text-green-600",
              count: transactions.filter((t) => t.method === "UPI").length,
            },
            {
              name: "Card Payments",
              description: "Transactions recorded through cards",
              icon: CreditCard,
              color: "bg-blue-50 text-blue-600",
              count: transactions.filter((t) => t.method === "Card").length,
            },
            {
              name: "Bank Transfers",
              description: "Recorded bank payout transactions",
              icon: ArrowUpRight,
              color: "bg-violet-50 text-violet-600",
              count: transactions.filter((t) => t.method === "Bank Transfer")
                .length,
            },
          ].map((method) => {
            const Icon = method.icon;

            return (
              <div
                key={method.name}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className={`rounded-xl p-3 ${method.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-semibold">{method.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {method.description}
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {method.count} transactions
                  </p>
                </div>
              </div>
            );
          })}
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
                placeholder="Search transaction, order or customer..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400"
              >
                <option value="All">All Types</option>
                <option value="Sale">Sale</option>
                <option value="Refund">Refund</option>
                <option value="Payout">Payout</option>
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

        {/* Transactions table */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
            <div>
              <h2 className="font-bold">Transaction History</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredTransactions.length} transaction(s) found
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Transaction</th>
                  <th className="px-5 py-4 font-semibold">Customer / Order</th>
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Gross Amount</th>
                  <th className="px-5 py-4 font-semibold">Fee</th>
                  <th className="px-5 py-4 font-semibold">Net Amount</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="cursor-pointer transition hover:bg-gray-50/80"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-xl p-2.5 ${
                            transaction.type === "Refund"
                              ? "bg-red-50 text-red-600"
                              : transaction.type === "Payout"
                                ? "bg-violet-50 text-violet-600"
                                : "bg-green-50 text-green-600"
                          }`}
                        >
                          {transaction.type === "Payout" ? (
                            <ArrowUpRight size={18} />
                          ) : transaction.type === "Refund" ? (
                            <ArrowDownLeft size={18} />
                          ) : (
                            <IndianRupee size={18} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{transaction.id}</p>
                          <p className="mt-1 text-xs text-gray-400">
                            {transaction.method}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium">{transaction.customer}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {transaction.orderId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium">
                        {transaction.type}
                      </span>
                      <p className="mt-1 text-xs text-gray-400">
                        {transaction.description}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatCurrency(transaction.amount)}
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {formatCurrency(transaction.fee)}
                    </td>

                    <td
                      className={`px-5 py-4 font-semibold ${
                        transaction.netAmount < 0
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      {transaction.netAmount < 0 ? "−" : ""}
                      {formatCurrency(Math.abs(transaction.netAmount))}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                          statusStyles[transaction.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-gray-500">
                      {new Date(
                        `${transaction.date}T00:00:00`,
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}

                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <CircleDollarSign
                        size={38}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      <p className="font-semibold">No transactions found</p>
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

      {/* Transaction details modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <p className="text-sm text-gray-500">Transaction Details</p>
                <h2 className="mt-1 text-xl font-bold">
                  {selectedTransaction.id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Net amount</p>
                <p
                  className={`mt-1 text-3xl font-bold ${
                    selectedTransaction.netAmount < 0
                      ? "text-red-600"
                      : "text-gray-800"
                  }`}
                >
                  {selectedTransaction.netAmount < 0 ? "−" : ""}
                  {formatCurrency(Math.abs(selectedTransaction.netAmount))}
                </p>
                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${
                    statusStyles[selectedTransaction.status] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedTransaction.status}
                </span>
              </div>

              {[
                ["Order ID", selectedTransaction.orderId],
                ["Customer", selectedTransaction.customer],
                ["Description", selectedTransaction.description],
                ["Transaction Type", selectedTransaction.type],
                ["Gross Amount", formatCurrency(selectedTransaction.amount)],
                ["Transaction Fee", formatCurrency(selectedTransaction.fee)],
                ["Payment Method", selectedTransaction.method],
                [
                  "Date",
                  new Date(
                    `${selectedTransaction.date}T00:00:00`,
                  ).toLocaleDateString("en-IN"),
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-right font-medium">{value}</span>
                </div>
              ))}

              <button
                onClick={() => setSelectedTransaction(null)}
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

export default SellerPayments;
