import { useState } from "react";
import AuthHooks from "../../hooks/AuthHooks";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, loginSumbit, navigate } = AuthHooks();
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shop<span className="text-orange-500">Kart</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(loginSumbit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              {...register("email")}
              className="w-full px-4 py-3.5 rounded-xl
              border border-gray-200 bg-gray-50
              outline-none focus:bg-white
              focus:border-orange-500
              focus:ring-4 focus:ring-orange-100
              transition"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-orange-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                {...register("password")}
                className="w-full px-4 py-3.5 pr-16 rounded-xl
                border border-gray-200 bg-gray-50
                outline-none focus:bg-white
                focus:border-orange-500
                focus:ring-4 focus:ring-orange-100
                transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2
                -translate-y-1/2 text-xs font-semibold
                text-gray-500 hover:text-orange-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-orange-500" />

            <span className="text-sm text-gray-500">Remember me</span>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl
            bg-orange-500 hover:bg-orange-600
            text-white font-semibold
            shadow-lg shadow-orange-500/20
            transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}
        <button
          className="w-full py-3.5 border border-gray-200
          rounded-xl flex items-center justify-center gap-3
          font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <span className="font-bold text-lg">G</span>
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-7">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-orange-500 font-semibold hover:underline cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
