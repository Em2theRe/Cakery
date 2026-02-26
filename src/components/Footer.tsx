import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-black/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cakery</p>
          <div className="flex gap-4">
            <Link className="hover:underline" href="/impressum">
              Impressum
            </Link>
            <Link className="hover:underline" href="/datenschutz">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
