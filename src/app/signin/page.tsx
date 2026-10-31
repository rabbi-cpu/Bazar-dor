"use client";

import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-10">
      

        {/* Right Side */}
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-base-content">
              Sign In
            </h2>

            <p className="mt-2 text-sm text-base-content/60">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-20"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-green-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success checkbox-sm"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-green-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="btn btn-success w-full text-white"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-base-content/70">
            Don&apos have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <div className="mt-8 border-t border-base-300 pt-5 text-center">
            <Link
              href="/"
              className="text-sm text-base-content/60 hover:text-green-600"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    
  );
};

export default SignInPage;