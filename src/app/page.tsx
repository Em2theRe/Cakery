import Link from "next/link";
import CakeCarouselPreview from "@/components/CakeCarouselPreview";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div
        className="cakery-card overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(242,154,141,0.55), rgba(242,154,141,0.25))",
        }}
      >
        <div className="grid gap-6 p-8 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight">
              Cakery - dein Wunschkuchen, einfach gestaltet.
            </h1>
            <p className="cakery-muted max-w-lg">
              Wähle eine Schablone, passe Geschmack & Design an und sende deine Bestellung
              ohne Login ab.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/builder" className="cakery-btn">
                Kuchen gestalten
              </Link>
              <Link href="/community" className="cakery-btn-outline">
                Community ansehen
              </Link>
            </div>
          </div>

        
                  <CakeCarouselPreview />
        </div>
      </div>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-3"></div>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="cakery-card p-4">
          <p className="font-medium">Schablonen</p>
          <p className="cakery-muted text-sm">
            Starter-Templates für schnelle Designs.
          </p>
        </div>
        <div className="cakery-card p-4">
          <p className="font-medium">Live-Preis</p>
          <p className="cakery-muted text-sm">
            Du siehst sofort, was dein Kuchen kostet.
          </p>
        </div>
        <div className="cakery-card p-4">
          <p className="font-medium">Einfach bestellen</p>
          <p className="cakery-muted text-sm">
            Daten erst beim Checkout – kein Login.
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="cakery-card p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">Bereit?</p>
            <p className="cakery-muted text-sm">
              Starte mit einer Schablone und passe alles an deinen Anlass an.
            </p>
          </div>
          <Link href="/builder" className="cakery-btn">
            Jetzt starten
          </Link>
        </div>
      </div>
    </div>
  );
}
