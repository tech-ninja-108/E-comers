import { ShoppingBag } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
          <ShoppingBag size={38} color="white" strokeWidth={2} />
        </div>

        {/* Spinner */}
        <div className="absolute -inset-2 rounded-3xl border-4 border-orange-200 border-t-orange-600 animate-spin" />
      </div>

      {/* Brand Name */}
      <h1 className="text-3xl font-bold text-gray-900">
        Shop<span className="text-orange-500">Kart</span>
      </h1>

      <p className="mt-3 text-gray-500 text-sm">
        Getting things ready for you...
      </p>

      {/* Loading Bar */}
      <div className="mt-7 w-56 h-1.5 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full w-1/2 rounded-full bg-orange-500 animate-pulse" />
      </div>

      <p className="mt-3 text-xs text-gray-400">Please wait a moment</p>
    </div>
  );
};

export default Loading;
