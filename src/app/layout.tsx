import type { Metadata } from "next";
import "./globals.css";
import { Pacifico } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Cakery",
  description: "Gestalte deinen Wunschkuchen.",
};

const logoFont = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`min-h-screen ${logoFont.variable}`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
