"use client";

import { useState } from "react";
import Link from "next/link";
import { transports } from "@/lib/bookings";

export default function TransportBookingPage() {
  const [query, setQuery] = useState("");

  const filteredTransports = transports.filter((transport) =>
    `${transport.name} ${transport.location}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Transport Booking</h1>

      <div className="mt-8 flex gap-3 rounded-2xl border border-line bg-surface p-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search transport or locations"
          aria-label="Search transport"
          className="min-w-0 flex-1 rounded-xl border border-sun/50 bg-black px-4 py-3 text-fg placeholder:text-muted focus:border-sun focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setQuery(query.trim())}
          className="rounded-xl bg-sun px-5 py-3 font-semibold text-black hover:bg-black hover:text-sun"
        >
          Search
        </button>
      </div>

      {filteredTransports.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTransports.map((transport) => (
            <article
              key={transport.name}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <img
                src={transport.image}
                alt={transport.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-semibold">{transport.name}</h2>
                    <p className="mt-1 text-sm text-muted">{transport.location}</p>
                  </div>
                  <span className="rounded-full bg-sun px-2.5 py-1 text-xs font-bold text-black">
                    ★ {transport.rating}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-lg font-semibold">
                    {transport.price}
                    <span className="text-xs font-normal text-muted"> / trip</span>
                  </p>
                  <Link
                    href={`/booking/transport/${transport.id}`}
                    className="rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-sun"
                  >
                    Booking
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-line bg-surface p-10 text-center">
          <p className="text-muted">No transport found for "{query}".</p>
        </div>
      )}
    </main>
  );
}
