"use client";

import { useState } from "react";

const travelPackages = [
  {
    name: "Ella Scenic Escape",
    location: "Ella, Sri Lanka",
    price: "$220",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1586613835436-5f8ad0b2d1d6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sigiriya Heritage Tour",
    location: "Sigiriya, Sri Lanka",
    price: "$180",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Galle Coastal Journey",
    location: "Galle, Sri Lanka",
    price: "$250",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Kandy Cultural Experience",
    location: "Kandy, Sri Lanka",
    price: "$195",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
  },
];

export default function TravelBookingPage() {
  const [query, setQuery] = useState("");

  const filteredPackages = travelPackages.filter((travel) =>
    `${travel.name} ${travel.location}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Travel Booking</h1>

      <div className="mt-8 flex gap-3 rounded-2xl border border-line bg-surface p-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search travel packages or locations"
          aria-label="Search travel packages"
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

      {filteredPackages.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((travel) => (
            <article
              key={travel.name}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <img
                src={travel.image}
                alt={travel.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-semibold">{travel.name}</h2>
                    <p className="mt-1 text-sm text-muted">{travel.location}</p>
                  </div>
                  <span className="rounded-full bg-sun px-2.5 py-1 text-xs font-bold text-black">
                    ★ {travel.rating}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-lg font-semibold">
                    {travel.price}
                    <span className="text-xs font-normal text-muted"> / package</span>
                  </p>
                  <button
                    type="button"
                    className="rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-sun"
                  >
                    Booking
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-line bg-surface p-10 text-center">
          <p className="text-muted">No travel packages found for "{query}".</p>
        </div>
      )}
    </main>
  );
}
