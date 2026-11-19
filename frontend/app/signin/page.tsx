import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Sign in | Traveler",
};

export default function SignInPage() {
  return (
    <main className="auth-page fixed inset-0 z-20 overflow-hidden">
      <Hero />
      <div className="absolute inset-0 flex items-center justify-center px-4 py-20">
        <section className="relative w-full max-w-[390px] rounded-2xl border border-white/10 bg-black/45 p-5 shadow-2xl backdrop-blur-md sm:p-6">
          <Link
            href="/"
            aria-label="Close sign in"
            className="absolute right-4 top-4 rounded-full p-1 text-white transition-colors hover:text-sun"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Link>
          <Link href="/" className="font-display text-xl font-semibold text-fg">
            Traveler
          </Link>
          <h1 className="mt-5 font-display text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-xs leading-5 text-white/65">
            Sign in to continue planning your Sri Lanka journey.
          </p>

          <form className="mt-5 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-fg placeholder:text-white/40 focus:border-sun focus:outline-none"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link href="#" className="text-sm text-sun hover:text-fg">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-fg placeholder:text-white/40 focus:border-sun focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-sun"
            >
              Sign in
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-white/65">
            Do not have an account?{" "}
            <Link href="/signup" className="font-semibold text-sun hover:text-fg">
              Sign up
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
