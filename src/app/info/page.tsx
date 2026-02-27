export default function InfoPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Info</h1>
        <p className="cakery-muted">
          Cakery macht es einfach, einen Kuchen genau nach deinem Wunsch zu gestalten – modern,
          schnell und mit viel Liebe zum Detail.
        </p>
      </header>

      <div className="cakery-card p-6">
        <h2 className="text-xl font-semibold">Was ist Cakery?</h2>
        <p className="cakery-muted mt-2">
          Bei Cakery stellst du deinen Kuchen Schritt für Schritt zusammen: Schablone wählen,
          Geschmack festlegen, Design und Dekoration auswählen – und du siehst direkt eine Vorschau
          und den Preis. Ohne unnötigen Aufwand, ohne Login, einfach klar und schön.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="cakery-card p-5">
          <p className="font-semibold">Schnell & intuitiv</p>
          <p className="cakery-muted mt-1 text-sm">
            Ein einfacher Prozess in 3 Schritten – du erkennst sofort, was du auswählst.
          </p>
        </div>

        <div className="cakery-card p-5">
          <p className="font-semibold">Live-Vorschau</p>
          <p className="cakery-muted mt-1 text-sm">
            Formen und Toppings werden direkt sichtbar – damit du nicht raten musst.
          </p>
        </div>

        <div className="cakery-card p-5">
          <p className="font-semibold">Preis transparent</p>
          <p className="cakery-muted mt-1 text-sm">
            Du siehst sofort, wie sich Extras auf den Preis auswirken.
          </p>
        </div>
      </div>

      <div className="cakery-card p-6">
        <h2 className="text-xl font-semibold">Unser Konzept</h2>
        <p className="cakery-muted mt-2">
          Cakery verbindet eine moderne Benutzeroberfläche mit einem effizienten, digitalen
          Bestellprozess. Dadurch können wir uns auf das Wesentliche konzentrieren: Qualität,
          Konsistenz und kreative Designs – genau so, wie du es dir vorstellst.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li>
            <span className="font-medium text-black">Individuell:</span>{" "}
            viele Kombinationen aus Geschmack, Farben und Dekorationen.
          </li>
          <li>
            <span className="font-medium text-black">Community:</span>{" "}
            Inspiration durch beliebte Designs und neue Ideen.
          </li>
          <li>
            <span className="font-medium text-black">Fokus auf User Experience:</span>{" "}
            klare Schritte, schnelle Entscheidungen, schönes Design.
          </li>
        </ul>
      </div>

      <div className="cakery-card p-6">
        <h2 className="text-xl font-semibold">Die Gründer</h2>
        <p className="cakery-muted mt-2">
          Cakery wurde 2026 gegründet und sitzt in Bonn.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <FounderCard name="Emre Yagiz" role="Co-Founder" />
          <FounderCard name="Ahmad Ahmad Ali" role="Co-Founder" />
          <FounderCard name="Hamzah Madiesh" role="Co-Founder" />
        </div>

        <div className="mt-5 text-sm cakery-muted">
          <p>
            <span className="font-medium text-black">Gründungsjahr:</span> 2026
          </p>
          <p>
            <span className="font-medium text-black">Sitz:</span> Wolfstr. 25, Bonn
          </p>
        </div>
      </div>
    </div>
  );
}

function FounderCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="cakery-card p-4">
      <p className="font-semibold">{name}</p>
      <p className="cakery-muted text-sm">{role}</p>
    </div>
  );
}