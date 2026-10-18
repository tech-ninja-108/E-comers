import { useState } from "react";
import AuthHooks from "../../hooks/AuthHooks";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, registerSumbit } = AuthHooks();

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shop<span className="text-orange-500">Kart</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account and start shopping.
          </p>
        </div>

        <form onSubmit={handleSubmit(registerSumbit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3.5 rounded-xl
              border border-gray-200 bg-gray-50
              outline-none focus:bg-white
              focus:border-orange-500
              focus:ring-4 focus:ring-orange-100
              transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              required
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                {...register("conformpassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-3.5 pr-16 rounded-xl
                border border-gray-200 bg-gray-50
                outline-none focus:bg-white
                focus:border-orange-500
                focus:ring-4 focus:ring-orange-100
                transition"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2
                -translate-y-1/2 text-xs font-semibold
                text-gray-500 hover:text-orange-500"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              className="mt-1 accent-orange-500"
            />

            <p className="text-xs text-gray-500 leading-5">
              I agree to the{" "}
              <span className="font-medium text-gray-800">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="font-medium text-gray-800">Privacy Policy</span>
            </p>
          </div>

          {/* Register */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl
            bg-orange-500 hover:bg-orange-600
            text-white font-semibold
            shadow-lg shadow-orange-500/20
            transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-7">
          Already have an account?{" "}
          <button className="text-orange-500 font-semibold hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
