import Link from "next/link";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-white">
        <Link href="/" className="font-display text-2xl font-semibold hover:text-sun">
          Traveler
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-sun">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#planner"
          className="rounded-full bg-sun px-5 py-2 text-sm font-semibold text-black hover:bg-black hover:text-sun"
        >
          Plan a trip
        </Link>
      </nav>
    </header>
  );
}