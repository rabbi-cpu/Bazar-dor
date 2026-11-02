
"use client";

import Image from "next/image";
import image from "@/app/assets/logo-icon.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Nav = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.replace("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-4 md:px-8">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={image}
            alt="বাজার দর Logo"
            width={45}
            height={45}
            className="rounded-lg bg-green-600 border border-green-700 p-2 shadow-sm"
          />

          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              বাজার দর
            </h1>

            <p className="hidden md:block text-sm text-base-content/70">
              {date}
            </p>
          </div>
        </Link>
      </div>

      {/* Authentication */}
      <div className="flex items-center gap-2">
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : session?.user ? (
          <div className="relative">
            {/* User Dropdown Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-base-200"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </span>

              <span className="hidden sm:block text-sm font-medium">
                {session.user.name}
              </span>

              <span className="text-xs">▼</span>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl">
                {/* User Info */}
                <div className="mb-3 border-b border-base-300 pb-3">
                  <p className="font-semibold">
                    {session.user.name}
                  </p>

                  <p className="break-all text-xs text-base-content/60">
                    {session.user.email}
                  </p>
                </div>

                {/* My Profile */}
                <Link
                  href="/Profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
                >
                  👤 আমার প্রোফাইল
                </Link>

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-base-200"
                >
                  ↩ সাইন আউট
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Sign In */}
            <Link href="/signin">
              <button className="btn btn-sm sm:btn-md">
                Signin
              </button>
            </Link>

            {/* Sign Up */}
            <Link href="/signup">
              <button className="btn bg-green-600 text-white border-green-600 hover:bg-green-700 btn-sm sm:btn-md">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
