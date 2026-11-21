import Link from "next/link";
import { notFound } from "next/navigation";
import { getBooking, type BookingCategory } from "@/lib/bookings";

type PageProps = {
  params: Promise<{ category: string; id: string }>;
};

export default async function BookingDetailPage({ params }: PageProps) {
  const { category, id } = await params;
  if (!["hotel", "transport", "travel"].includes(category)) notFound();

  const booking = getBooking(category as BookingCategory, id);
  if (!booking) notFound();

  const backHref =
    category === "hotel"
      ? "/hotel-booking"
      : category === "transport"
        ? "/transport-booking"
        : "/travel-booking";

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pb-20 pt-28">
      <Link href={backHref} className="text-sm font-semibold text-sun hover:text-fg">
        ← Back to bookings
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.55fr_0.45fr]">
        <section>
          <div className="overflow-hidden rounded-3xl border border-line">
            <img src={booking.images[0]} alt={booking.name} className="h-[420px] w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {booking.images.slice(1).map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`${booking.name} view ${index + 2}`}
                className="h-44 w-full rounded-2xl border border-line object-cover"
              />
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-black">★ {booking.rating}</span>
          <p className="mt-5 text-sm uppercase tracking-[0.18em] text-sun">{category} booking</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">{booking.name}</h1>
          <p className="mt-2 text-muted">{booking.location}</p>

          <div className="mt-6 border-y border-line py-5">
            <p className="text-3xl font-semibold">
              {booking.price}
              <span className="text-sm font-normal text-muted"> / {booking.unit}</span>
            </p>
          </div>

          <Link
            href={`/checkout/${category}/${booking.id}`}
            className="mt-6 block rounded-full bg-sun px-6 py-3 text-center font-semibold text-black hover:bg-black hover:text-sun"
          >
            Checkout
          </Link>
        </aside>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-display text-2xl">About this booking</h2>
          <p className="mt-4 leading-7 text-muted">{booking.description}</p>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-display text-2xl">Payment</h2>
          <p className="mt-4 text-lg font-semibold text-sun">{booking.payment}</p>
          <p className="mt-2 text-sm text-muted">Secure checkout. No hidden booking fees.</p>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-display text-2xl">Facilities</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {booking.facilities.map((facility) => (
              <li key={facility} className="flex items-center gap-2 text-muted">
                <span className="text-sun">✓</span> {facility}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-display text-2xl">Services</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {booking.services.map((service) => (
              <li key={service} className="flex items-center gap-2 text-muted">
                <span className="text-sun">✓</span> {service}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
