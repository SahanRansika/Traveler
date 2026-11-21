"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getBooking, type BookingCategory } from "@/lib/bookings";

const TEST_CARD_NUMBER = "4242424242424242";
const TEST_EXPIRY = "12/30";
const TEST_CVV = "123";

export default function CardTransactionPage() {
  const params = useParams<{ category: string; id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = params.category as BookingCategory;
  const validCategory = ["hotel", "transport", "travel"].includes(params.category);
  const booking = validCategory ? getBooking(category, params.id) : undefined;
  const reference = searchParams.get("reference") ?? "";

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!booking) {
    return (
      <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
        <h1 className="text-3xl font-semibold">Booking not found</h1>
      </main>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedCardNumber = cardNumber.replace(/\D/g, "");
    if (cardName.trim().length < 2) {
      setError("Enter a cardholder name.");
      return;
    }
    if (normalizedCardNumber !== TEST_CARD_NUMBER) {
      setError("Use card number: 4242 4242 4242 4242.");
      return;
    }
    if (expiry !== TEST_EXPIRY) {
      setError("Use expiry: 12/30.");
      return;
    }
    if (cvv !== TEST_CVV) {
      setError("Use CVV: 123.");
      return;
    }

    setSubmitting(true);
    try {
      if (!reference) throw new Error("Missing booking reference.");
      const response = await fetch(`/api/bookings/${encodeURIComponent(reference)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "confirmed" }),
      });
      if (!response.ok) throw new Error("Could not confirm the booking.");
      router.replace("/booking");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Could not confirm the booking.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <Link href={`/checkout/${category}/${booking.id}`} className="text-sm font-semibold text-sun">
        ← Back to checkout
      </Link>
      <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Card payment</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Review and enter your card details below. No card information is transmitted or saved.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.38fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <div
            aria-label="Card preview"
            className="aspect-[1.586/1] max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-sun via-[#d98a2b] to-[#9e5718] p-6 text-black shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-12 rounded-lg border border-black/20 bg-[#f5d58a]">
                <div className="mt-2 h-px bg-black/25" />
                <div className="mt-2 h-px bg-black/25" />
              </div>
              <span className="font-display text-xl font-bold">TRAVELLER</span>
            </div>
            <p className="mt-10 min-h-8 font-mono text-xl tracking-[0.14em] sm:text-2xl">
              {cardNumber || "4242 4242 4242 4242"}
            </p>
            <div className="mt-7 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Card holder</p>
                <p className="mt-1 truncate text-sm font-bold uppercase tracking-wider">
                  {cardName || "YOUR NAME"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Expires</p>
                <p className="mt-1 text-sm font-bold">{expiry || "12/30"}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm">
              Cardholder name
              <input
                required
                maxLength={30}
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
                placeholder="John Smith"
                className="rounded-xl border border-line bg-black px-4 py-3 text-fg"
              />
            </label>
            <label className="grid gap-2 text-sm">
              Card number
              <input
                required
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(
                    event.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
                  )
                }
                placeholder="4242 4242 4242 4242"
                pattern="[0-9 ]{19}"
                title="Enter 4242 4242 4242 4242"
                className="rounded-xl border border-line bg-black px-4 py-3 font-mono tracking-wider text-fg"
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm">
                Expiry
                <input
                  required
                  inputMode="numeric"
                  value={expiry}
                  onChange={(event) => {
                    const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
                    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
                  }}
                  pattern="[0-9]{2}/[0-9]{2}"
                  placeholder="12/30"
                  className="rounded-xl border border-line bg-black px-4 py-3 text-fg"
                />
              </label>
              <label className="grid gap-2 text-sm">
                CVV
                <input
                  required
                  type="password"
                  inputMode="numeric"
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 3))}
                  minLength={3}
                  maxLength={3}
                  placeholder="123"
                  className="rounded-xl border border-line bg-black px-4 py-3 text-fg"
                />
              </label>
            </div>
          </div>

          {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-sun px-6 py-3 font-semibold text-black hover:bg-black hover:text-sun disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Confirming..." : "Confirm payment"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <img src={booking.image} alt={booking.name} className="h-44 w-full rounded-2xl object-cover" />
          <h2 className="mt-5 font-display text-xl">{booking.name}</h2>
          <p className="mt-1 text-sm text-muted">{booking.location}</p>
          <div className="mt-5 flex justify-between border-t border-line pt-5">
            <span className="text-muted">Starting price</span>
            <strong className="text-xl text-sun">{booking.price}</strong>
          </div>
          {reference && <p className="mt-3 break-all font-mono text-xs text-muted">Reference: {reference}</p>}
        </aside>
      </div>
    </main>
  );
}
