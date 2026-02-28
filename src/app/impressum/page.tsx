export default function ImpressumPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Impressum</h1>
        <p className="cakery-muted">
          Angaben gemäß § 5 TMG (Rechtsform MUSS hier rein!!!).
        </p>
      </header>

      <div className="cakery-card p-6 space-y-3">
        <div>
          <p className="font-semibold">Cakery</p>
          <p className="cakery-muted text-sm">Wolfstr. 25</p>
          <p className="cakery-muted text-sm">Bonn, Deutschland</p>
        </div>

        <div>
          <p className="font-semibold">Vertreten durch</p>
          <ul className="cakery-muted text-sm list-disc pl-5 mt-1 space-y-1">
            <li>Emre Yagiz (Baker)</li>
            <li>Ahmad Ahmad Ali</li>
            <li>Hamzah Madiesh</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Kontakt</p>
          <p className="cakery-muted text-sm">
            E-Mail: <span className="text-black">[Cakery mail hier rein]</span>
          </p>
          <p className="cakery-muted text-sm">
            Telefon: <span className="text-black">[same]</span>
          </p>
        </div>

        <div>
          <p className="font-semibold">Gründungsjahr</p>
          <p className="cakery-muted text-sm">2026</p>
        </div>

        <div>
          <p className="font-semibold">Weitere Angaben (falls zutreffend)</p>
          <ul className="cakery-muted text-sm list-disc pl-5 mt-1 space-y-1">
            <li>Handelsregister: <span className="text-black">[same]</span></li>
            <li>Registergericht: <span className="text-black">[same]</span></li>
            <li>USt-IdNr.: <span className="text-black">[same]</span></li>
          </ul>
        </div>
      </div>

      <div className="cakery-card p-6 space-y-2">
        <h2 className="text-xl font-semibold">Haftungshinweis</h2>
        <p className="cakery-muted text-sm">
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
          externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
          verantwortlich.
        </p>
      </div>
    </div>
  );
}