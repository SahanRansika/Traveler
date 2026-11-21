"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getBooking, type BookingCategory } from "@/lib/bookings";

export default function CheckoutPage() {
  const params = useParams<{ category: string; id: string }>();
  const category = params.category as BookingCategory;
  const validCategory = ["hotel", "transport", "travel"].includes(params.category);
  const booking = validCategory ? getBooking(category, params.id) : undefined;
  const [completed, setCompleted] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!booking) {
    return (
      <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
        <h1 className="text-3xl font-semibold">Booking not found</h1>
      </main>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompleted(true);
  }

  if (completed) {
    return (
      <main className="mx-auto flex min-h-[100svh] max-w-3xl items-center px-5 pb-20 pt-28">
        <div className="w-full rounded-3xl border border-line bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sun text-3xl text-black">✓</div>
          <h1 className="mt-6 font-display text-4xl">Booking confirmed</h1>
          <p className="mt-3 text-muted">Your request for {booking.name} has been received.</p>
          <Link href="/" className="mt-7 inline-block rounded-full bg-sun px-6 py-3 font-semibold text-black">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <Link href={`/booking/${category}/${booking.id}`} className="text-sm font-semibold text-sun">
        ← Back to booking details
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.38fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl">Guest details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">Full name
              <input required name="name" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
            <label className="grid gap-2 text-sm">Email
              <input required name="email" type="email" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
            <label className="grid gap-2 text-sm">Phone
              <input required name="phone" type="tel" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
            <label className="grid gap-2 text-sm">{category === "hotel" ? "Check-in date" : "Travel date"}
              <input required name="date" type="date" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
          </div>

          <h2 className="mt-8 font-display text-2xl">Payment details</h2>
          <div className="mt-5 aspect-[1.586/1] max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-sun via-[#d98a2b] to-[#9e5718] p-6 text-black shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="h-10 w-12 rounded-lg border border-black/20 bg-[#f5d58a]">
                <div className="mt-2 h-px bg-black/25" />
                <div className="mt-2 h-px bg-black/25" />
              </div>
              <span className="font-display text-xl font-bold">TRAVELLER</span>
            </div>
            <p className="mt-10 min-h-8 font-mono text-xl tracking-[0.14em] sm:text-2xl">
              {cardNumber || "0000 0000 0000 0000"}
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
                <p className="mt-1 text-sm font-bold">{expiry || "MM/YY"}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm">Cardholder name
              <input
                required
                name="cardName"
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
                maxLength={30}
                placeholder="Name on card"
                className="rounded-xl border border-line bg-black px-4 py-3 text-fg"
              />
            </label>
            <label className="grid gap-2 text-sm">Card number
              <input
                required
                name="cardNumber"
                inputMode="numeric"
                autoComplete="cc-number"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(
                    event.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
                  )
                }
                pattern="[0-9 ]{19}"
                title="Enter a 16-digit card number"
                placeholder="0000 0000 0000 0000"
                className="rounded-xl border border-line bg-black px-4 py-3 font-mono text-fg tracking-wider"
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm">Expiry
                <input
                  required
                  name="expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={expiry}
                  onChange={(event) => {
                    const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
                    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
                  }}
                  pattern="[0-9]{2}/[0-9]{2}"
                  placeholder="MM/YY"
                  className="rounded-xl border border-line bg-black px-4 py-3 text-fg"
                />
              </label>
              <label className="grid gap-2 text-sm">CVV
                <input
                  required
                  name="cvv"
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))}
                  minLength={3}
                  maxLength={4}
                  placeholder="•••"
                  className="rounded-xl border border-line bg-black px-4 py-3 text-fg"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-sun px-6 py-3 font-semibold text-black hover:bg-black hover:text-sun"
          >
            Confirm payment
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <img src={booking.image} alt={booking.name} className="h-44 w-full rounded-2xl object-cover" />
          <h2 className="mt-5 font-display text-xl">{booking.name}</h2>
          <p className="mt-1 text-sm text-muted">{booking.location}</p>
          <div className="mt-5 flex justify-between border-t border-line pt-5">
            <span className="text-muted">Total</span>
            <strong className="text-xl text-sun">{booking.price}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
