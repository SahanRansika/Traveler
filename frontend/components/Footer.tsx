export default function Footer() {
  return (
    <footer className="border-t border-line bg-black py-10 text-center text-sm text-muted">
      <p className="font-display text-xl text-fg">Traveler</p>
      <p className="mt-2">Hotels, transport and trip planning for Sri Lanka.</p>
      <p className="mt-4">© {new Date().getFullYear()} Traveler</p>
    </footer>
  );
}