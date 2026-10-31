
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    alert("Password matched successfully!");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100";

  const labelClass = "block text-sm font-semibold text-gray-700";

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8">
        {/* Logo */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-200 bg-green-50 text-3xl shadow-sm">
            🛒
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your BazarDor account to get started.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password (min. 8 characters)"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Enter your password again"
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className={inputClass}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 py-3.5 font-semibold text-white shadow-md shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.99]"
          >
            Create Account
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Footer */}
        <div className="mt-7 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs text-gray-400">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
      </div>
    </main>
  );
}
