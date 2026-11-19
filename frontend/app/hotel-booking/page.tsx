"use client";

import { useState } from "react";

const hotels = [
  {
    name: "Ocean View Resort",
    location: "Galle, Sri Lanka",
    price: "$120",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ella Mountain Hotel",
    location: "Ella, Sri Lanka",
    price: "$95",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sigiriya Garden Inn",
    location: "Sigiriya, Sri Lanka",
    price: "$110",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1551887373-7c1b8f8c1cc4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Colombo City Hotel",
    location: "Colombo, Sri Lanka",
    price: "$105",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HotelBookingPage() {
  const [query, setQuery] = useState("");

  const filteredHotels = hotels.filter((hotel) =>
    `${hotel.name} ${hotel.location}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Hotel Booking</h1>

      <div className="mt-8 flex gap-3 rounded-2xl border border-line bg-surface p-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search hotels or locations"
          aria-label="Search hotels"
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

      {filteredHotels.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <article
              key={hotel.name}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-semibold">{hotel.name}</h2>
                    <p className="mt-1 text-sm text-muted">{hotel.location}</p>
                  </div>
                  <span className="rounded-full bg-sun px-2.5 py-1 text-xs font-bold text-black">
                    ★ {hotel.rating}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-lg font-semibold">
                    {hotel.price}
                    <span className="text-xs font-normal text-muted"> / night</span>
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
          <p className="text-muted">No hotels found for "{query}".</p>
        </div>
      )}
    </main>
  );
}
