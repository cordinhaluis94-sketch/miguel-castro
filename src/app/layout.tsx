import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InteriorAI — Design de Interiores por Foto",
  description:
    "Transforme qualquer divisão com sugestões profissionais de design de interiores geradas por inteligência artificial.",
  openGraph: {
    title: "InteriorAI — Design de Interiores por Foto",
    description:
      "Carregue uma foto, escolha o estilo e veja o espaço reimaginado em segundos.",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "InteriorAI — Design de Interiores por Foto",
    description:
      "Carregue uma foto, escolha o estilo e veja o espaço reimaginado em segundos.",
  },
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
