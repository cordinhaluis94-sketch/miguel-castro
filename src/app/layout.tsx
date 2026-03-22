import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InteriorAI — Design de Interiores por Foto",
  description:
    "Transforme qualquer divisão com sugestões profissionais de design de interiores geradas por inteligência artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <body className="font-sans antialiased bg-stone-950 text-stone-100">
        {children}
      </body>
    </html>
  );
}
