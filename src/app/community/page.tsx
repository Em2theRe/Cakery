import Image from "next/image";
import { getCommunityCakePaths } from "@/lib/communityCakes";

export default async function CommunityPage() {
  const communityCakes = getCommunityCakePaths();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Die Meisterwerke unserer Community</h1>
      <p className="text-black/70">
        Hier siehst du die gleichen Kuchenbilder wie in der Carousel Preview.
      </p>

      {communityCakes.length === 0 && (
        <div className="cakery-card p-4 text-sm text-black/70">
          Keine Community-Bilder gefunden. Bitte lege die Dateien in <code>public/cakes</code> ab.
        </div>
      )}


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {communityCakes.map((cakePath, index) => (
          <div key={cakePath} className="cakery-card overflow-hidden p-3">
            <Image
              src={cakePath}
              alt={`Community-Kuchen ${index + 1}`}
              width={640}
              height={420}
              className="h-56 w-full rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
