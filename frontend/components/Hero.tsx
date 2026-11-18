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

export default function Hero() {
  const [text, setText] = useState("");
  const [slide, setSlide] = useState(0);

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
          <Link href="/#planner" className="rounded-full bg-sun px-7 py-3 font-semibold text-black hover:bg-black hover:text-sun">
            Get started
          </Link>
          <Link href="/#services" className="rounded-full border border-white/60 px-7 py-3 font-semibold hover:bg-white/10">
            See what Traveler does
          </Link>
        </div>
      </div>
    </section>
  );
}
