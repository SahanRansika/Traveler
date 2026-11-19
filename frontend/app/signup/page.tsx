import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Sign up | Traveler",
};

export default function SignUpPage() {
  return (
    <main className="auth-page fixed inset-0 z-20 overflow-hidden">
      <Hero />
      <div className="absolute inset-0 flex items-center justify-center px-4 py-20">
        <section className="relative w-full max-w-[390px] rounded-2xl border border-white/10 bg-black/45 p-5 shadow-2xl backdrop-blur-md sm:p-6">
          <Link
            href="/"
            aria-label="Close sign up"
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
          <h1 className="mt-5 font-display text-3xl font-semibold">Create account</h1>
          <p className="mt-2 text-xs leading-5 text-white/65">
            Create an account and plan hotels, transport and trips in one place.
          </p>

          <form className="mt-5 space-y-3.5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-fg placeholder:text-white/40 focus:border-sun focus:outline-none"
              />
            </div>

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
                className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-fg placeholder:text-white/40 focus:border-sun focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-fg placeholder:text-white/40 focus:border-sun focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-sun"
            >
              Create account
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-white/65">
            Already have an account?{" "}
            <Link href="/signin" className="font-semibold text-sun hover:text-fg">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
