"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBooking, type BookingCategory } from "@/lib/bookings";

type BookingRecord = {
  reference: string;
  status: "pending" | "confirmed" | "cancelled";
  category: BookingCategory;
  bookingId: string;
  bookingName: string;
  date: string;
  quantity: number;
  name: string;
};

export default function BookingPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingDate, setEditingDate] = useState<string | null>(null);

  async function loadBookings() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/bookings", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error("Could not load bookings.");
      setBookings((result.bookings as BookingRecord[]).filter((booking) => booking.status !== "pending"));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load bookings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadBookings();
  }, []);

  async function updateDate(reference: string, date: string) {
    if (!date) return;
    const response = await fetch(`/api/bookings/${encodeURIComponent(reference)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date }),
    });
    if (!response.ok) {
      setError("Could not update the booking date.");
      return;
    }
    setEditingDate(null);
    await loadBookings();
  }

  async function cancelBooking(reference: string) {
    if (!window.confirm("Cancel this booking?")) return;
    const response = await fetch(`/api/bookings/${encodeURIComponent(reference)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    if (!response.ok) {
      setError("Could not cancel the booking.");
      return;
    }
    await loadBookings();
  }

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">My bookings</h1>
      <p className="mt-3 text-muted">View, change dates, or cancel confirmed bookings.</p>

      {loading ? (
        <p className="mt-10 text-muted">Loading bookings...</p>
      ) : error ? (
        <p role="alert" className="mt-10 text-red-400">{error}</p>
      ) : bookings.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-line bg-surface p-10 text-center">
          <h2 className="font-display text-2xl">No bookings yet</h2>
          <p className="mt-3 text-muted">Choose a hotel, transport, or travel package to get started.</p>
          <Link href="/hotel-booking" className="mt-6 inline-block rounded-full bg-sun px-6 py-3 font-semibold text-black">
            Browse bookings
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => {
            const details = getBooking(booking.category, booking.bookingId);
            return (
              <article key={booking.reference} className="overflow-hidden rounded-3xl border border-line bg-surface">
                {details && (
                  <img src={details.image} alt={booking.bookingName} className="h-48 w-full object-cover" />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-sun">{booking.category}</p>
                      <h2 className="mt-2 font-display text-2xl">{booking.bookingName}</h2>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      booking.status === "confirmed"
                        ? "bg-sun text-black"
                        : "border border-line text-muted"
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {editingDate === booking.reference ? (
                    <form
                      className="mt-5 flex gap-3"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const form = new FormData(event.currentTarget);
                        void updateDate(booking.reference, String(form.get("date") ?? ""));
                      }}
                    >
                      <input
                        required
                        name="date"
                        type="date"
                        defaultValue={booking.date}
                        className="min-w-0 flex-1 rounded-xl border border-line bg-black px-3 py-2.5 text-fg"
                      />
                      <button type="submit" className="rounded-xl bg-sun px-4 py-2.5 font-semibold text-black">
                        Save
                      </button>
                    </form>
                  ) : (
                    <p className="mt-5 text-sm text-muted">
                      Date: <strong className="text-fg">{booking.date}</strong>
                    </p>
                  )}

                  <p className="mt-2 text-sm text-muted">
                    Quantity: <strong className="text-fg">{booking.quantity}</strong>
                  </p>
                  <p className="mt-2 break-all font-mono text-xs text-muted">Reference: {booking.reference}</p>

                  {booking.status === "confirmed" && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingDate(booking.reference)}
                        className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-sun hover:text-sun"
                      >
                        Change date
                      </button>
                      <button
                        type="button"
                        onClick={() => void cancelBooking(booking.reference)}
                        className="rounded-full border border-red-400/60 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-400 hover:text-black"
                      >
                        Cancel booking
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
