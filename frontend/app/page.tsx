import Link from "next/link";
import Hero from "@/components/Hero";

const services = [
  {
    title: "Hotel booking",
    text: "Compare stays across Sri Lanka, from guesthouses to beach resorts, and reserve a room for your dates.",
  },
  {
    title: "Transport booking",
    text: "Book trains, buses, cars with a driver or airport transfers so every leg of the trip is covered.",
  },
  {
    title: "Trip planning",
    text: "Choose destinations, dates, stay and transport in one planner and see your full itinerary before you pay.",
  },
];

const steps = [
  "Pick your destinations and travel dates.",
  "Choose a hotel and the transport between stops.",
  "Review the plan, then check out in one go.",
];

const destinations = [
  {
    name: "Ella",
    text: "Misty mountains, scenic train rides and tea estates.",
    image:
      "https://res.cloudinary.com/dt2xaqo32/image/upload/v1793513222/Gemini_Generated_Image_aygsx2aygsx2aygs_eiuy8b.jpg",
  },
  {
    name: "Sigiriya",
    text: "Ancient history and wide views from Lion Rock.",
    image:
      "https://res.cloudinary.com/dt2xaqo32/image/upload/v1793544504/5d0ff2b4b6e6857f1e14ebf3b4fa1cd912f578b6a641a0e3d8271cfc5e1c891c_yoshoy.avif",
  },
  {
    name: "Galle",
    text: "Coastal charm, historic streets and golden beaches.",
    image:
      "https://res.cloudinary.com/dt2xaqo32/image/upload/v1793454699/454952-sri-lanka-wallpaper_hl4gwv.jpg",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-2 md:items-center"
      >
        <img
          src="https://res.cloudinary.com/dt2xaqo32/image/upload/v1793513240/Gemini_Generated_Image_sii0vesii0vesii0_qx1nkr.jpg"
          alt="Landscape of Sri Lanka"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
        />
        <div>
          <h2 className="font-display text-4xl font-semibold">About Traveler</h2>
          <p className="mt-5 max-w-prose leading-7 text-muted">
            Planning a trip usually means many tabs: one for hotels, one for
            buses and trains, one for notes. Travello puts hotel booking,
            transport booking and trip planning into a single flow so you can
            build a Sri Lankan journey and pay for it once.
          </p>
          <p className="mt-4 max-w-prose leading-7 text-muted">
            Create an account, plan your route, book your stays and transport,
            and keep every booking in one place.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-line bg-surface py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-4xl font-semibold">What you can do</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="border-t-4 border-sun pt-5">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-7 text-muted">{s.text}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-20 font-display text-2xl font-semibold">How it works</h3>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s}
                className="flex gap-4 rounded-xl border border-line bg-base p-5"
              >
                <span className="font-display text-3xl text-sun">{i + 1}</span>
                <span className="leading-7 text-muted">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="font-display text-4xl font-semibold">Where to first</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destinations.map((d) => (
            <article
              key={d.name}
              className="relative h-96 overflow-hidden rounded-2xl border border-line text-white"
            >
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-display text-3xl">{d.name}</h3>
                <p className="mt-2 text-sm text-white/85">{d.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="planner" className="border-t border-line bg-surface py-24 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="font-display text-4xl font-semibold">Start planning your trip</h2>
          <p className="mt-4 text-muted">
            Sign up to pick destinations, dates, hotels and transport in one planner.
          </p>
          <Link
            href="/#planner"
            className="mt-8 inline-block rounded-full bg-sun px-8 py-3 font-semibold text-black hover:bg-black hover:text-sun"
          >
            Create an account
          </Link>
        </div>
      </section>
    </main>
  );
}