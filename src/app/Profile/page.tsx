
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdateName = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        setError(error.message || "Name update failed.");
        return;
      }

      setMessage("নাম সফলভাবে পরিবর্তন হয়েছে!");

      // Refresh session and Navbar
      await authClient.getSession();

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">
          Please Sign In
        </h2>

        <Link href="/signin" className="btn btn-success text-white">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-base-content/60">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="font-semibold">
                {session.user.name}
              </h2>

              <p className="text-sm text-base-content/60">
                {session.user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="btn btn-outline btn-error btn-sm"
          >
            ↩ সাইন আউট
          </button>
        </div>

        {/* Update Name */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">

          <h2 className="mb-5 text-lg font-bold">
            নাম হালনাগাদ করুন
          </h2>

          <form
            onSubmit={handleUpdateName}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                নাম
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={session.user.name || "আপনার নাম"}
                className="input input-bordered w-full"
                required
                minLength={2}
              />
            </div>

            {/* Success Message */}
            {message && (
              <p className="rounded-lg bg-green-100 p-3 text-sm text-green-700">
                {message}
              </p>
            )}

            {/* Error Message */}
            {error && (
              <p className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="btn btn-success text-white"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "নাম হালনাগাদ করুন"
              )}
            </button>
          </form>
        </div>


      </div>
    </div>
  );
};

export default ProfilePage;
