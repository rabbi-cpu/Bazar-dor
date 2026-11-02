"use client";

import { useState, Suspense } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackURL") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (result.error) {
        setError(result.error.message || "Email অথবা password ভুল হয়েছে।");
        return;
      }

      router.push(callbackURL);
      router.refresh();
    } catch {
      setError("Login করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };
  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setError("");
    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL,
      });
    } catch (err) {
      console.error(`${provider} signin error:`, err);
      setError("Login করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-green-50/50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-xl shadow-green-100/50 sm:p-8">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">
            🛒
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            বাজার দর
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            তোমার অ্যাকাউন্টে Sign In করো
          </p>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="তোমার email লিখো"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="তোমার password লিখো"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white shadow-md shadow-green-100 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sign In হচ্ছে..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs text-gray-400">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google & GitHub Sign In */}
        <div className="flex gap-3">
          {/* Google */}
          <button
            type="button"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignIn("google")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FcGoogle className="text-xl" />

            {socialLoading === "google" ? "Connecting..." : "Google"}
          </button>

          {/* GitHub */}
          <button
            type="button"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignIn("github")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaGithub className="text-xl" />

            {socialLoading === "github" ? "Connecting..." : "GitHub"}
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Sign Up
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[75vh] items-center justify-center">
          Loading...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}