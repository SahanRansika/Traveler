"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const images = [
  "https://res.cloudinary.com/dt2xaqo32/image/upload/v1793453480/3558149_latkif.jpg",
  "https://res.cloudinary.com/dt2xaqo32/image/upload/v1793454699/454952-sri-lanka-wallpaper_hl4gwv.jpg",
  "https://res.cloudinary.com/dt2xaqo32/image/upload/v1793513222/Gemini_Generated_Image_aygsx2aygsx2aygs_eiuy8b.jpg",
  "https://res.cloudinary.com/dt2xaqo32/image/upload/v1793544504/5d0ff2b4b6e6857f1e14ebf3b4fa1cd912f578b6a641a0e3d8271cfc5e1c891c_yoshoy.avif",
];

const lines = ["Explore the world.", "Travel your way."];
const full = lines.join("\n");

type Country = {
  name: string;
  code: string;
  flag: string;
  capitals: string[];
};

const fallbackCountries: Country[] = [
  { name: "Sri Lanka", code: "LK", flag: "https://flagcdn.com/w40/lk.png", capitals: ["Colombo", "Sri Jayawardenepura Kotte"] },
  { name: "India", code: "IN", flag: "https://flagcdn.com/w40/in.png", capitals: ["New Delhi"] },
  { name: "United States", code: "US", flag: "https://flagcdn.com/w40/us.png", capitals: ["Washington, D.C."] },
  { name: "United Kingdom", code: "GB", flag: "https://flagcdn.com/w40/gb.png", capitals: ["London"] },
  { name: "Australia", code: "AU", flag: "https://flagcdn.com/w40/au.png", capitals: ["Canberra"] },
];

export default function Hero() {
  const [text, setText] = useState("");
  const [slide, setSlide] = useState(0);
  const [showPlanner, setShowPlanner] = useState(false);
  const [plannerType, setPlannerType] = useState("");
  const [countries, setCountries] = useState<Country[]>(fallbackCountries);
  const [countryCode, setCountryCode] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flags,capital", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load countries");
        return response.json();
      })
      .then((data: Array<{ name: { common: string }; cca2: string; flags: { png: string }; capital?: string[] }>) => {
        const loaded = data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            flag: country.flags?.png || `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
            capitals: country.capital || [],
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        if (loaded.length) setCountries(loaded);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!showPlanner) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowPlanner(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [showPlanner]);

  // Typewriter: types, pauses, restarts
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(full);
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i < full.length) {
        i++;
        setText(full.slice(0, i));
        t = setTimeout(tick, 90);
      } else {
        t = setTimeout(() => {
          i = 0;
          setText("");
          t = setTimeout(tick, 500);
        }, 2500);
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);

  // Background slideshow
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden text-white">
      <div className="absolute inset-0" aria-hidden="true">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url("${src}")` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-24">
        <h1 className="min-h-[2.4em] whitespace-pre-line font-display text-5xl font-semibold leading-tight sm:text-7xl">
          {text}
          <span className="ml-1 inline-block w-[2px] animate-pulse bg-sun">&nbsp;</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">
          Traveler is a Sri Lanka travel platform where you book your hotel,
          book your transport and plan the whole trip, all in one place.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setShowPlanner(true)}
            className="rounded-full bg-sun px-7 py-3 font-semibold text-black hover:bg-black hover:text-sun"
          >
            Get started
          </button>
          <Link href="/#services" className="rounded-full border border-white/60 px-7 py-3 font-semibold hover:bg-white/10">
            See what Traveler does
          </Link>
        </div>
      </div>

      {showPlanner && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 px-4 py-20 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="plan-booking-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowPlanner(false);
          }}
        >
          <section className="relative w-full max-w-[390px] rounded-2xl border border-white/15 bg-black/65 p-5 shadow-2xl backdrop-blur-md sm:p-6">
            <button
              type="button"
              aria-label="Close Plan Booking"
              onClick={() => setShowPlanner(false)}
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
            </button>

            <h2 id="plan-booking-title" className="font-display text-3xl font-semibold">
              Plan Booking
            </h2>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div>
                <label htmlFor="planner-type" className="mb-1.5 block text-sm font-medium">
                  Planner type
                </label>
                <select
                  id="planner-type"
                  value={plannerType}
                  onChange={(event) => setPlannerType(event.target.value)}
                  required
                  className="w-full cursor-pointer rounded-lg border border-sun bg-sun px-3 py-2.5 text-sm font-semibold text-black focus:border-sun focus:outline-none"
                >
                  <option value="" disabled className="bg-black text-white">Select planner type</option>
                  <option value="hotel" className="bg-black text-white">Hotel</option>
                  <option value="transport" className="bg-black text-white">Transport</option>
                  <option value="travel" className="bg-black text-white">Travel</option>
                </select>
              </div>

              <div>
                <label htmlFor="destination-country" className="mb-1.5 block text-sm font-medium">
                  Destination country
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-sun bg-sun px-3 text-black">
                  {countryCode && (
                    <img
                      src={countries.find((country) => country.code === countryCode)?.flag}
                      alt=""
                      className="h-5 w-7 rounded-sm border border-black/20 object-cover"
                    />
                  )}
                  <select
                    id="destination-country"
                    value={countryCode}
                    onChange={(event) => {
                      setCountryCode(event.target.value);
                      setLocation("");
                    }}
                    required
                    className="min-w-0 flex-1 cursor-pointer bg-transparent py-2.5 text-sm font-semibold text-black focus:outline-none"
                  >
                    <option value="" disabled className="bg-black text-white">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code} className="bg-black text-white">
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="destination-location" className="mb-1.5 block text-sm font-medium">
                  Location
                </label>
                <select
                  id="destination-location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                  disabled={!countryCode}
                  className="w-full cursor-pointer rounded-lg border border-sun bg-sun px-3 py-2.5 text-sm font-semibold text-black focus:border-sun focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled className="bg-black text-white">Select a location</option>
                  {countries
                    .find((country) => country.code === countryCode)
                    ?.capitals.map((capital) => (
                      <option key={capital} value={capital} className="bg-black text-white">{capital}</option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="guest-count" className="mb-1.5 block text-sm font-medium">
                  Guest count
                </label>
                <input
                  id="guest-count"
                  type="number"
                  min="1"
                  max="50"
                  value={guests}
                  onChange={(event) => setGuests(Math.max(1, Number(event.target.value) || 1))}
                  required
                  className="w-full rounded-lg border border-white/15 bg-black/70 px-3 py-2.5 text-sm text-white focus:border-sun focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-sun"
              >
                Continue
              </button>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
