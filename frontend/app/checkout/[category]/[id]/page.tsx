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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  if (!booking) {
    return (
      <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
        <h1 className="text-3xl font-semibold">Booking not found</h1>
      </main>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      category: params.category,
      bookingId: params.id,
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      date: String(form.get("date") ?? ""),
      quantity: Number(form.get("quantity") ?? 1),
      notes: String(form.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit your request.");
      setReference(result.reference);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <main className="mx-auto flex min-h-[100svh] max-w-3xl items-center px-5 pb-20 pt-28">
        <div className="w-full rounded-3xl border border-line bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sun text-3xl text-black">✓</div>
          <h1 className="mt-6 font-display text-4xl">Request received</h1>
          <p className="mt-3 text-muted">
            Your {booking.name} booking request is pending confirmation.
          </p>
          <p className="mt-5 font-mono text-sm text-sun">Reference: {reference}</p>
          <Link href="/" className="mt-7 inline-block rounded-full bg-sun px-6 py-3 font-semibold text-black">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const quantityLabel = category === "hotel" ? "Nights" : category === "transport" ? "Passengers" : "Guests";
  const dateLabel = category === "hotel" ? "Check-in date" : "Travel date";

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <Link href={`/booking/${category}/${booking.id}`} className="text-sm font-semibold text-sun">
        ← Back to booking details
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Booking checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.38fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl">Guest details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              Full name
              <input required minLength={2} maxLength={80} name="name" autoComplete="name" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
            <label className="grid gap-2 text-sm">
              Email
              <input required maxLength={120} name="email" type="email" autoComplete="email" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
            <label className="grid gap-2 text-sm">
              Phone
              <input required minLength={7} maxLength={25} name="phone" type="tel" autoComplete="tel" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
            <label className="grid gap-2 text-sm">
              {dateLabel}
              <input required name="date" type="date" className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
            <label className="grid gap-2 text-sm">
              {quantityLabel}
              <input required name="quantity" type="number" min={1} max={20} defaultValue={1} className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
            </label>
          </div>

          <label className="mt-5 grid gap-2 text-sm">
            Notes <span className="text-muted">(optional)</span>
            <textarea name="notes" maxLength={500} rows={4} className="rounded-xl border border-line bg-black px-4 py-3 text-fg" />
          </label>

          {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-sun px-6 py-3 font-semibold text-black hover:bg-black hover:text-sun disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit booking request"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <img src={booking.image} alt={booking.name} className="h-44 w-full rounded-2xl object-cover" />
          <h2 className="mt-5 font-display text-xl">{booking.name}</h2>
          <p className="mt-1 text-sm text-muted">{booking.location}</p>
          <div className="mt-5 border-t border-line pt-5">
            <div className="flex justify-between">
              <span className="text-muted">Starting price</span>
              <strong className="text-xl text-sun">{booking.price}</strong>
            </div>
            <p className="mt-2 text-xs text-muted">Final availability and charges are confirmed by the provider.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
