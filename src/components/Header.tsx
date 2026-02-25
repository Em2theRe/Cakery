import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "Kuchen gestalten" },
  { href: "/community", label: "Community" },
  { href: "/reviews", label: "Bewertungen" },
  { href: "/info", label: "Info" },
];

export default function Header() {
    return (
        <header
          className="border-b"
          style={{
            borderColor: "var(--border)",
            background: "rgba(255,247,238,0.75)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              <span
                className="rounded-xl px-3 py-1"
                style={{ background: "rgba(242,154,141,0.25)" }}
              >
                Cakery
              </span>
            </Link>
      
            <nav className="flex flex-wrap gap-2 text-sm">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 hover:bg-black/5"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      );
      
}
